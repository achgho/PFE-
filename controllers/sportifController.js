const { Sportif } = require('../chemin/vers/votre/fichier/du/modele/Sportif');

// Contrôleur pour gérer les opérations CRUD liées au modèle Sportif

// Créer un nouveau sportif
async function createSportif(req, res) {
  try {
    const { nom, prenom, email, password, telephone, taille, poids } = req.body;
    const nouveauSportif = await Sportif.create({
      nom,
      prenom,
      email,
      password,
      telephone,
      taille,
      poids
    });
    res.status(201).json(nouveauSportif);
  } catch (error) {
    console.error("Erreur lors de la création du sportif :", error);
    res.status(500).json({ message: "Erreur lors de la création du sportif" });
  }
}

// Obtenir tous les sportifs
async function getAllSportifs(req, res) {
  try {
    const sportifs = await Sportif.findAll();
    res.status(200).json(sportifs);
  } catch (error) {
    console.error("Erreur lors de la récupération des sportifs :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des sportifs" });
  }
}

// Obtenir un sportif par son ID
async function getSportifById(req, res) {
  const { id } = req.params;
  try {
    const sportif = await Sportif.findByPk(id);
    if (!sportif) {
      return res.status(404).json({ message: "Sportif non trouvé" });
    }
    res.status(200).json(sportif);
  } catch (error) {
    console.error("Erreur lors de la récupération du sportif :", error);
    res.status(500).json({ message: "Erreur lors de la récupération du sportif" });
  }
}

// Mettre à jour un sportif
async function updateSportif(req, res) {
  const { id } = req.params;
  try {
    const [rowsUpdated, updatedSportif] = await Sportif.update(req.body, {
      where: { id },
      returning: true, // Pour retourner le sportif mis à jour
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Sportif non trouvé" });
    }
    res.status(200).json(updatedSportif[0]);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du sportif :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du sportif" });
  }
}

// Supprimer un sportif
async function deleteSportif(req, res) {
  const { id } = req.params;
  try {
    const deletedSportifCount = await Sportif.destroy({ where: { id } });
    if (deletedSportifCount === 0) {
      return res.status(404).json({ message: "Sportif non trouvé" });
    }
    res.status(204).end(); // Aucun contenu à renvoyer après la suppression
  } catch (error) {
    console.error("Erreur lors de la suppression du sportif :", error);
    res.status(500).json({ message: "Erreur lors de la suppression du sportif" });
  }
}

// Export des fonctions du contrôleur
module.exports = {
  createSportif,
  getAllSportifs,
  getSportifById,
  updateSportif,
  deleteSportif
};
