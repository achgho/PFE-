const { Sequelize, DataTypes } = require('sequelize');

// Définir le modèle Sportif

module.exports = (sequelize) => {
  const Activite = sequelize.define('Activite', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prix: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  return Activite;
};

