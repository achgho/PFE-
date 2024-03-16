const { Activite } = require('../chemin/vers/votre/fichier/du/modele/Activite');

// Contrôleur pour gérer les opérations CRUD liées au modèle Activite

// Créer une nouvelle activité
async function createActivite(req, res) {
  try {
    const { nom, description } = req.body;
    const nouvelleActivite = await Activite.create({
      nom,
      description,
    });
    res.status(201).json(nouvelleActivite);
  } catch (error) {
    console.error("Erreur lors de la création de l'activité :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'activité" });
  }
}

// Obtenir toutes les activités
async function getAllActivites(req, res) {
  try {
    const activites = await Activite.findAll();
    res.status(200).json(activites);
  } catch (error) {
    console.error("Erreur lors de la récupération des activités :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des activités" });
  }
}

// Obtenir une activité par son ID
async function getActiviteById(req, res) {
  const { id } = req.params;
  try {
    const activite = await Activite.findByPk(id);
    if (!activite) {
      return res.status(404).json({ message: "Activité non trouvée" });
    }
    res.status(200).json(activite);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'activité :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'activité" });
  }
}

// Mettre à jour une activité
async function updateActivite(req, res) {
  const { id } = req.params;
  try {
    const [rowsUpdated, updatedActivite] = await Activite.update(req.body, {
      where: { id },
      returning: true, // Pour retourner l'activité mise à jour
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Activité non trouvée" });
    }
    res.status(200).json(updatedActivite[0]);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'activité :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'activité" });
  }
}

// Supprimer une activité
async function deleteActivite(req, res) {
  const { id } = req.params;
  try {
    const deletedActiviteCount = await Activite.destroy({ where: { id } });
    if (deletedActiviteCount === 0) {
      return res.status(404).json({ message: "Activité non trouvée" });
    }
    res.status(204).end(); // Aucun contenu à renvoyer après la suppression
  } catch (error) {
    console.error("Erreur lors de la suppression de l'activité :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'activité" });
  }
}

// Export des fonctions du contrôleur
module.exports = {
  createActivite,
  getAllActivites,
  getActiviteById,
  updateActivite,
  deleteActivite
};
