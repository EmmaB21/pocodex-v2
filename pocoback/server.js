const express = require("express");
const cardRoutes = require("./routes/cardRoutes");

const app = express();
const cors = require("cors");

// Middleware pour JSON
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", cardRoutes); // Toutes les routes commenceront par /api

// Lancer le serveur
const PORT = 3001;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
