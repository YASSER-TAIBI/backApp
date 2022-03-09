const mongoose = require('mongoose');

const updatePasswordSchema = mongoose.Schema({

    titreAct: String,
    localisationAct: String,
    dateHeursStart: Date,
    dateHeursEnd: Date,
    descriptionAct: String
    
});

const updatePasswordModel = mongoose.model('UpdatePassword', updatePasswordSchema);

module.exports = updatePasswordModel;