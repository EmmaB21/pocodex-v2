const express = require("express");
const cardController = require("../controllers/cardController");

const router = express.Router();

// Route pour ajouter une carte
router.post("/cards", cardController.createCard);

// Route pour récupérer toutes les cartes
router.get("/cards", cardController.getAllCards);

// Route pour récupérer une carte par ID
router.get("/cards/:id", cardController.getCardById);

// Route pour supprimer une carte par ID
router.delete("/cards/:id", cardController.deleteCard);

// Route pour modifier la quantité d'une carte par ID
router.patch("/cards/:id", cardController.updateCard);

module.exports = router;
