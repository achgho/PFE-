const db = require("../database/connexion")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require('validator')
const {isPasswordValid,isAlpha}=require('../functions/functions')
const fs = require("fs")
const Compte = db.Compte

exports.login = async (req, res) => {
    try {
        //extraction des données du corps de la requette
        let { email } = req.body

        //vérification des données saisies par l'utilisateur
        if (!validator.isEmail(email)) return res.status(400).json({ message: 'L\'email n\'est pas valide' })

        //vérification de l'existance de l'utilisateur
        const Compte = await Compte.findOne({
            where: { email: email }
        })
        if (!Compte) return res.status(400).json({ message: "Email et/ou mot de passe incorrects" })

        //vérification du mot de passe
        const isMatch = await bcrypt.compare(req.body.password, Compte.password);
        if (!isMatch) return res.status(400).json({ message: "Email et/ou mot de passe incorrects" })

        //récupération de la clé privée secrete
        const secret = fs.readFileSync('certs/private.pem')

        //génération du token
        const tokenaccess = jwt.sign(
            {
                id: Compte.id
            },
            secret,
            {
                expiresIn: "1h",
                algorithm: 'RS256'
            }
        )
        return res.status(200).json({ access_token: tokenaccess })

    } catch (err) {
        return res.status(500).json({ message: `${err.message}` });
    }
}

exports.registre = async (req, res) => {
    try {
        //extraction des données du corps de la requette
        let { email, nom, prenom, password } = req.body
      
        //vérification des données saisies par l'utilisateur
        if(!email||!nom||!prenom||!password)return res.status(400).json({ message: 'Tous les champs sont requis' })
        if (!validator.isEmail(email)) return res.status(400).json({ message: 'L\'email n\'est pas valide' })
        if (!isAlpha(nom) || !isAlpha(prenom)) return res.status(400).json({ message: 'Le nom et le prénom doivent être des chaînes de caractères' }) 
        if(!isPasswordValid(password)) return res.status(400).json({ message: 'Le mot de passe n\'est pas valide' })

        const verifEmail = await Compte.findOne({
            where: {
                email: email
            }
        })
        if (verifEmail) {
            return res.status(409).json({ message: `L\'émail est déjà utilisé` })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newCompte = await Compte.create({
                nom,
                prenom,
                email,
                password: hashedPassword
            })
            if (newCompte) {
                return res.status(201).json({ message: `La création effectué avec succés` })
            }
            else return res.status(400).json({ message: `La création a rencontré un échec` })

        }
    } catch (err) {
        return res.status(500).json({ message: `${err.message}` })
    }
}