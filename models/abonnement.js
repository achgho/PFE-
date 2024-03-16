const { Sequelize, DataTypes } = require('sequelize');

// Définir le modèle Abonnement
module.exports = (sequelize) => {
  const Abonnement = sequelize.define('Abonnement', {
   
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateFin: {
      type: DataTypes.VIRTUAL, // Utilisation d'un type virtuel pour calculer la date de fin
      get() {
        // Calculer la date de fin 30 jours après la date de début
        const dateDebut = this.getDataValue('dateDebut');
        if (!dateDebut) return null; // Retourner null si la date de début n'est pas définie
        const dateFin = new Date(dateDebut);
        dateFin.setDate(dateFin.getDate() + 30); // Ajouter 30 jours à la date de début
        return dateFin.toISOString().split('T')[0]; // Retourner la date de fin au format ISO (AAAA-MM-JJ)
      },
    },
    nomActivite: {
        type: DataTypes.STRING, // Supposons que le nom de l'activité est une chaîne de caractères
        allowNull: false,
      },
  }, {
    timestamps: true,
  });

  return Abonnement;
};
