const { Entraineur } = require('../chemin/vers/votre/fichier/du/modele/Entraineur');

// Contrôleur pour gérer les opérations CRUD liées au modèle Entraineur

// Créer un nouvel entraîneur
async function createEntraineur(req, res) {
  try {
    const { nom, prenom, email, password, telephone, taille, poids } = req.body;
    const nouvelEntraineur = await Entraineur.create({
      nom,
      prenom,
      email,
      password,
      telephone,
      taille,
      poids
    });
    res.status(201).json(nouvelEntraineur);
  } catch (error) {
    console.error("Erreur lors de la création de l'entraîneur :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'entraîneur" });
  }
}

// Obtenir tous les entraîneurs
async function getAllEntraineurs(req, res) {
  try {
    const entraineurs = await Entraineur.findAll();
    res.status(200).json(entraineurs);
  } catch (error) {
    console.error("Erreur lors de la récupération des entraîneurs :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des entraîneurs" });
  }
}

// Obtenir un entraîneur par son ID
async function getEntraineurById(req, res) {
  const { id } = req.params;
  try {
    const entraineur = await Entraineur.findByPk(id);
    if (!entraineur) {
      return res.status(404).json({ message: "Entraîneur non trouvé" });
    }
    res.status(200).json(entraineur);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'entraîneur :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'entraîneur" });
  }
}

// Mettre à jour un entraîneur
async function updateEntraineur(req, res) {
  const { id } = req.params;
  try {
    const [rowsUpdated, updatedEntraineur] = await Entraineur.update(req.body, {
      where: { id },
      returning: true, // Pour retourner l'entraîneur mis à jour
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "Entraîneur non trouvé" });
    }
    res.status(200).json(updatedEntraineur[0]);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'entraîneur :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'entraîneur" });
  }
}

// Supprimer un entraîneur
async function deleteEntraineur(req, res) {
  const { id } = req.params;
  try {
    const deletedEntraineurCount = await Entraineur.destroy({ where: { id } });
    if (deletedEntraineurCount === 0) {
      return res.status(404).json({ message: "Entraîneur non trouvé" });
    }
    res.status(204).end(); // Aucun contenu à renvoyer après la suppression
  } catch (error) {
    console.error("Erreur lors de la suppression de l'entraîneur :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'entraîneur" });
  }
}

// Export des fonctions du contrôleur
module.exports = {
  createEntraineur,
  getAllEntraineurs,
  getEntraineurById,
  updateEntraineur,
  deleteEntraineur
};
