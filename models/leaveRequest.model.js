const mongoose = require('mongoose');

const leaveRequestSchema = mongoose.Schema({

    titreAct: String,
    localisationAct: String,
    dateHeursStart: Date,
    dateHeursEnd: Date,
    descriptionAct: String
    
});

const leaveRequestModel = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = leaveRequestModel;