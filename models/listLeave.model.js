const mongoose = require('mongoose');

const listLeaveSchema = mongoose.Schema({

    titreAct: String,
    localisationAct: String,
    dateHeursStart: Date,
    dateHeursEnd: Date,
    descriptionAct: String
    
});

const listLeaveModel = mongoose.model('ListLeave', listLeaveSchema);

module.exports = listLeaveModel;