/*
// importation d'express via la constante express et la commande require
const express = require('express');

// on appel la méthode express via la constante app
const app = express();

// exportation de cette application pour avoir accès via les autres fichiers
module.exports = app;
*/


const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');

const Thing = require('./models/thing');

mongoose.connect('mongodb+srv://Manuhiri:Taoahere1507@cluster0.swscs.mongodb.net/Openclassroom?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// ce doit être le mpremier middleware a être exécuter
app.use((req, res, next) => {// un middleware général qui s'applique à toutes les ROUTE
    res.setHeader('Access-Control-Allow-Origin', '*');// origine ceux qui on le droit d'accéder à notre api est tout le monde *
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //autorisation pour utililser certain header
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorisation pour utiliser certaine méthods
    next();
});

app.use(bodyParser.json()); //nous permet d'utilliser une méthode (json de body parser) afin de transformer le corps de la requette en objet JS utilisable

/* On change la méthode post afin de lier la bdd
app.post('/api/stuff', (req, res, next) => {// pour traiter les requête post
    console.log(req.body);
    res.status(201).json({// status 201 pour envoyer une réponse
        message: 'Objet créé !'
    });
});
*/

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id; // on retire le champ id du champ de la requête
    const thing = new Thing({ //Thing est une instance
        //title: req.body.title on continue pour les autres ligne
        //méthode plus simple
        ...req.body // '...' est un opérateur il va copier les champs qu'il y a dans le corps de la requette pour le détailler ensuite
    });
    thing.save() // save une méthode qui permet d'enregistrer dans la bdd
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

app.use((req, res, next) => { // app.use est une méthode req=requête res=réponse next=fonction qui permet d'envoyer l'exécution de la prochaine fonction du serveur (elle traite toute les requêtes)
    console.log('Requête reçue !');
    next();// ne pas oublier sinon il ne renvois pas à la prochaine fonction
});


/* ici nous avons créer les produits à la main
app.use('/api/stuff', (req, res, next) => { // '/api/stuff url visé par l'pplication nommé aussi npoint ou la route
    const stuff = [ // stuff est un tableau que l'on créer et ou l'on intègre 2 objets
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900, // prix exprimer en centime pour éviter les problème arithmétique
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);// le middleware attribu un code 200 = réussi et renvois en réponse le tableau stuff
});
*/

app.use('/api/stuff', (req, res, next) => {
    Thing.find()// méthode find 
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});




/*
app.use((req, res, next) => {
    res.status(201);// permet de changer le statut de la page (404,500...)
    next();
});
*/


app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });// l'objet réponse et la méthode json 
    next();
});

app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
});

module.exports = app;