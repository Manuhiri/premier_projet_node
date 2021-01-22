/*
// importation d'express via la constante express et la commande require
const express = require('express');

// on appel la m�thode express via la constante app
const app = express();

// exportation de cette application pour avoir acc�s via les autres fichiers
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
    .then(() => console.log('Connexion � MongoDB r�ussie !'))
    .catch(() => console.log('Connexion � MongoDB �chou�e !'));

// ce doit �tre le mpremier middleware a �tre ex�cuter
app.use((req, res, next) => {// un middleware g�n�ral qui s'applique � toutes les ROUTE
    res.setHeader('Access-Control-Allow-Origin', '*');// origine ceux qui on le droit d'acc�der � notre api est tout le monde *
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //autorisation pour utililser certain header
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorisation pour utiliser certaine m�thods
    next();
});

app.use(bodyParser.json()); //nous permet d'utilliser une m�thode (json de body parser) afin de transformer le corps de la requette en objet JS utilisable

/* On change la m�thode post afin de lier la bdd
app.post('/api/stuff', (req, res, next) => {// pour traiter les requ�te post
    console.log(req.body);
    res.status(201).json({// status 201 pour envoyer une r�ponse
        message: 'Objet cr�� !'
    });
});
*/

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id; // on retire le champ id du champ de la requ�te
    const thing = new Thing({ //Thing est une instance
        //title: req.body.title on continue pour les autres ligne
        //m�thode plus simple
        ...req.body // '...' est un op�rateur il va copier les champs qu'il y a dans le corps de la requette pour le d�tailler ensuite
    });
    thing.save() // save une m�thode qui permet d'enregistrer dans la bdd
        .then(() => res.status(201).json({ message: 'Objet enregistr� !' }))
        .catch(error => res.status(400).json({ error }));
});

app.use((req, res, next) => { // app.use est une m�thode req=requ�te res=r�ponse next=fonction qui permet d'envoyer l'ex�cution de la prochaine fonction du serveur (elle traite toute les requ�tes)
    console.log('Requ�te re�ue !');
    next();// ne pas oublier sinon il ne renvois pas � la prochaine fonction
});


/* ici nous avons cr�er les produits � la main
app.use('/api/stuff', (req, res, next) => { // '/api/stuff url vis� par l'pplication nomm� aussi npoint ou la route
    const stuff = [ // stuff est un tableau que l'on cr�er et ou l'on int�gre 2 objets
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900, // prix exprimer en centime pour �viter les probl�me arithm�tique
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxi�me objet',
            description: 'Les infos de mon deuxi�me objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);// le middleware attribu un code 200 = r�ussi et renvois en r�ponse le tableau stuff
});
*/

app.use('/api/stuff', (req, res, next) => {
    Thing.find()// m�thode find 
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
    res.json({ message: 'Votre requ�te a bien �t� re�ue !' });// l'objet r�ponse et la m�thode json 
    next();
});

app.use((req, res) => {
    console.log('R�ponse envoy�e avec succ�s !');
});

module.exports = app;