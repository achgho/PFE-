const { Sequelize, DataTypes } = require('sequelize');

// Définir le modèle Sportif

module.exports = (sequelize) => {
  const Sportif = sequelize.define('Sportif', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, 
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taille: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    poids: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Sportif'),
      allowNull: false,
      defaultValue: 'Sportif',
    },
  }, {
    timestamps: true,
  });

  return Sportif;
};

