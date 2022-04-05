var express = require('express');
var router = express.Router();

const config = require('../config/database');
const contratModel = require('../models/contrat.model');



/* GET all contrat */
router.get('/list', function(req, res, next) {

  contratModel.find(function(err, contratListResp){
    if(err){
      res.send({status: 500, message: 'Unable to Find contrat'});
            }
      else{

        const recordCount = contratListResp.length;
      res.send({status: 200,recordCount:recordCount , results: contratListResp});
          }

  });

});



/* GET Details of a specific contrat */
router.get('/view', function(req, res, next) {

  const idContrat = req.query.idContrat;

  contratModel.findById(idContrat, function(err, contratResp){

    if(err){
      res.send({status: 500, message: 'Unable to Find the contrat'});
            }
      else{
      res.send({status: 200, results: contratResp});
          }

  });

});

/* GET Details of a specific contrat Example: utilisateur  */
router.get('/view-specific', function(req, res, next) {

  contratModel.find({'utilisateur':'624c45ec9290016325f4c276'}, function(err, contratResp){

    if(err){
      res.send({status: 500, message: 'Unable to Find the contrat'});
            }
      else{
      res.send({status: 200, results: contratResp});
          }

  });

});

/* Create new Contrat . */
router.post('/add', function(req, res, next) {
    
let typeContrat =req.body.typeContrat;
let nbrHeure =req.body.nbrHeure;
let salaireBrut =req.body.salaireBrut;
let nbrConges =req.body.nbrConges;
let utilisateur =req.body.utilisateur;


let contratObj = new contratModel({

  typeContrat: typeContrat,
  nbrHeure: nbrHeure,
  salaireBrut: salaireBrut,
  nbrConges: nbrConges,
  utilisateur: utilisateur

});

contratObj.save(function(err, contratObj){

  if(err){
  res.send({status: 500, message: 'Unable to add contrat'});
        }
  else{
  res.send({status: 200, message: 'contrat added successfully', contratDetails: contratObj});
      }
  });
});


/* Update existing Contrat . */
router.put('/update', function(req, res, next) {

  const idContrat = req.body.idContrat;

let typeContrat =req.body.typeContrat;
let nbrHeure =req.body.nbrHeure;
let salaireBrut =req.body.salaireBrut;
let nbrConges =req.body.nbrConges;
let utilisateur =req.body.utilisateur;


let contratObj ={
  typeContrat: typeContrat,
  nbrHeure: nbrHeure,
  salaireBrut: salaireBrut,
  nbrConges: nbrConges,
  utilisateur: utilisateur

};

  contratModel.findByIdAndUpdate(idContrat, contratObj, function(err, contratResp){

    if(err){
      res.send({status: 500, message: 'Unable to update the contrat'});
            }
      else{
      res.send({status: 200, message: 'contrat updated successfully', results: contratObj});
          }

  });
  });

/* Delete existing Contrat . */
router.delete('/delete', function(req, res, next) {
  const idContrat = req.query.idContrat;

  contratModel.findByIdAndDelete(idContrat, function(err, contratResp){

    if(err){
      res.send({status: 500, message: 'Unable to Delete the contrat'});
            }
      else{
      res.send({status: 200, message: 'contrat deleted successfully', results: contratResp});
          }

  });
  });

/* Search existing Contrat . */
router.get('/search', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;
