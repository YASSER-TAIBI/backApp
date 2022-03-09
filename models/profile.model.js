const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({

    titreAct: String,
    localisationAct: String,
    dateHeursStart: Date,
    dateHeursEnd: Date,
    descriptionAct: String
    
});

const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;