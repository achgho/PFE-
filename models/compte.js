const { DataTypes } = require('sequelize')

/*** Définition du modèle User */
module.exports = (sequelize) => {
    const Compte = sequelize.define('Compte', {
        id_Compte: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        nom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            require:true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(100),

        },
        role:{
            type: DataTypes.STRING(100),
            defaultValue:'Compte'
        }
    },
        { paranoid: true })


    return Compte
}