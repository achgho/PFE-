const { Abonnement } = require('../chemin/vers/votre/fichier/du/modele/Abonnement');

// Contrôleur pour gérer les opérations CRUD liées au modèle Abonnement

// Créer un nouvel abonnement
async function createAbonnement(req, res) {
  try {
    const { dateDebut, nomActivite } = req.body;
    const nouvelAbonnement = await Abonnement.create({
      dateDebut,
      nomActivite,
    });
    res.status(201).json(nouvelAbonnement);
  } catch (error) {
    console.error("Erreur lors de la création de l'abonnement :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'abonnement" });
  }
}

// Obtenir tous les abonnements
async function getAllAbonnements(req, res) {
  try {
    const abonnements = await Abonnement.findAll();
    res.status(200).json(abonnements);
  } catch (error) {
    console.error("Erreur lors de la récupération des abonnements :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des abonnements" });
  }
}

// Obtenir un abonnement par son ID
async function getAbonnementById(req, res) {
  const { id } = req.params;
  try {
    const abonnement = await Abonnement.findByPk(id);
    if (!abonnement) {
      return res.status(404).json({ message: "Abonnement non trouvé" });
    }
    res.status(200).json(abonnement);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'abonnement :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'abonnement" });
  }
}

// Mettre à jour un abonnement
async function updateAbonnement(req, res) {
  const { id } = req.params;
  try {
    const [rowsUpdated, updatedAbonnement] = await Abonnement.update(req.body, {
      where: { id },
      returning: true, // Pour retourner l'abonnement mis à jour
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Abonnement non trouvé" });
    }
    res.status(200).json(updatedAbonnement[0]);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'abonnement :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'abonnement" });
  }
}

// Supprimer un abonnement
async function deleteAbonnement(req, res) {
  const { id } = req.params;
  try {
    const deletedAbonnementCount = await Abonnement.destroy({ where: { id } });
    if (deletedAbonnementCount === 0) {
      return res.status(404).json({ message: "Abonnement non trouvé" });
    }
    res.status(204).end(); // Aucun contenu à renvoyer après la suppression
  } catch (error) {
    console.error("Erreur lors de la suppression de l'abonnement :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'abonnement" });
  }
}

// Export des fonctions du contrôleur
module.exports = {
  createAbonnement,
  getAllAbonnements,
  getAbonnementById,
  updateAbonnement,
  deleteAbonnement
};
    