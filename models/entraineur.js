const { Sequelize, DataTypes } = require('sequelize');

// Définir le modèle Sportif

module.exports = (sequelize) => {
  const Entraineur = sequelize.define('Entraineur', {
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
      type: DataTypes.ENUM('Entraineur'),
      allowNull: false,
      defaultValue: 'Entraineur',
    },
  }, {
    timestamps: true,
  });

  return Entraineur;
};

