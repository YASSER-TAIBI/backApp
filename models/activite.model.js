const mongoose = require('mongoose');

const activiteSchema = mongoose.Schema({

    titreAct: String,
    localisationAct: String,
    dateHeursStart: Date,
    dateHeursEnd: Date,
    descriptionAct: String
    
});

const activiteModel = mongoose.model('Activite', activiteSchema);

module.exports = activiteModel;