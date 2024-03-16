//importation des modules necessaires
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

//importation des routes
const authRoutes=require('./routes/authRoute')


//connexion à la base de données
const dataBase=require('./database/connexion')

//instantiation d'express
const app = express()

//définition du port
const port = process.env.PORT || 4000

//configuration de l'instantiation
app.use(helmet()) 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.header("Cross-Origin-Resource-Policy", "same-site")
  res.header("Content-Security-Policy", "default-src 'self'")
  res.header("X-Frame-Options", "SAMEORIGIN")
  res.header("X-XSS-Protection", "1; mode=block")
  res.header("Referrer-Policy", "strict-origin-when-cross-origin")
  res.header("Feature-Policy", "camera 'none'; microphone 'none'")
  res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
  next()
})
//configuration des routes
app.use('/',authRoutes)


//tester la connexion et configurer le port
try {
    dataBase.sequelize.authenticate()
      .then(() => {
        app.listen(port, () => {
          console.log(`Connexion réussite sur le port ${port}`);
        });
      })
      .catch(err => {
        console.error('Erreur lors de la connexion à la base de données :', err);
      });
  } catch (err) {
    console.error(err);
  }

