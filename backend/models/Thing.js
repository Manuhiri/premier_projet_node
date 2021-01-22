const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({  // création du shema de donnée Schema est une méthode de mongoose
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);// exportation de la méthode model pour pouvoir enregistrer dans la bdd