const prisma = require("../prisma/prismaClient");

// Créer une nouvelle carte
exports.createCard = async (req, res) => {
  try {
    const { set, variants, illustrator, dexId, legal, updated, regulationMark,...cardData } = req.body; // Exclusion d'illustrator, dexId, legal, updated et regulationMark

    // Vérifie si la carte existe déjà
    const existingCard = await prisma.card.findUnique({
      where: { id: cardData.id },
    });

    let newCard;

    if (existingCard) {
      // Si la carte existe, on incrémente la quantité
      newCard = await prisma.card.update({
        where: { id: cardData.id },
        data: { quantity: existingCard.quantity + 1 },
      });
    } else {

      newCard = await prisma.card.create({
        data: {
          ...cardData,
          types: {
            create: cardData.types?.map((type) => ({ type: type })),
          },
          attacks: {
            create: cardData.attacks?.map((attack) => ({
              name: attack.name,
              cost: JSON.stringify(attack.cost),
              effect: attack.effect || null,
              damage: attack.damage ? parseInt(attack.damage, 10) : null, // Conversion de damage en Int ou Null
            })),
          },
          abilities: {
            create: cardData.abilities?.map((ability) => ({
              type: ability.type,
              name: ability.name,
              effect: ability.effect || null, // Pas de conversion en Int
            })),
          },
          weaknesses: {
            create: cardData.weaknesses?.map((weakness) => ({
              type: weakness.type,
              value: weakness.value,
            })),
          },
          resistances: {
            create: cardData.resistances?.map((resistance) => ({
              type: resistance.type,
              value: resistance.value,
            })),
          },
          variants: JSON.stringify(variants || {}),
          set: {
            connectOrCreate: {
              where: { id: set.id },
              create: {
                id: set.id,
                name: set.name,
                symbol: set.symbol,
              },
            },
          },
        },
      });
    }

    res.status(201).json(newCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create card' });
  }
};

// Récupérer toutes les cartes
exports.getAllCards = async (req, res) => {
  try {
    const cards = await prisma.card.findMany({
      include: { attacks: true, types: true, abilities: true, weaknesses: true,resistances: true, set: true },
    });
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des cartes." });
  }
};

// Récupérer une carte par ID
exports.getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await prisma.card.findUnique({
      where: { id },
      include: { attacks: true, types: true, abilities: true, weaknesses: true,resistances: true, set: true },
    });
    if (!card) {
      return res.status(404).json({ error: "Carte non trouvée." });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de la carte." });
  }
};

// Suppression d'une carte
exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    // Supprime la carte de la base de données
    const deletedCard = await prisma.card.delete({
      where: { id },
    });

    res.status(200).json({ success: true, card: deletedCard });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ success: false, error: 'Failed to delete card' });
  }
};

// modifier la quantité d'une carte
exports.updateCard = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body; // Nous mettons à jour le champ 'quantity'
  
  try {
    const updatedCard = await prisma.card.update({
      where: { id },
      data: { quantity },
    });
    res.status(200).json(updatedCard);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Failed to update card" });
  }
};
