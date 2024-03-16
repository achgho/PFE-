const { Sequelize } = require('sequelize')

/*** Connexion à la base de données */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)

/* Mise en place des relations */

const db = {}
db.sequelize = sequelize
db.Compte = require('../models/compte')(sequelize)
db.sportif = require('../models/Sportif')(sequelize)
db.abonnement = require('../models/abonnement')(sequelize)
db.Activite = require('../models/Activite')(sequelize)
db.entraineur = require('../models/entraineur')(sequelize)




// Définition de la relation entre (sportif *-----1 Compte)
db.sportif.belongsTo(db.Compte, { foreignKey: 'id_Compte' }); 
db.Compte.hasMany(db.sportif, { foreignKey: 'id_Compte', onDelete: 'cascade' });



db.sequelize.sync({alter: true})

module.exports = db