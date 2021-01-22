const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({  // cr�ation du shema de donn�e Schema est une m�thode de mongoose
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);// exportation de la m�thode model pour pouvoir enregistrer dans la bdd