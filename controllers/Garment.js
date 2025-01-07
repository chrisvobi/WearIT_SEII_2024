'use strict';

var utils = require('../utils/writer.js');
var Garment = require('../service/GarmentService');

// Controller for the Garment 
// Handles all functions related to garments

// Handles the getGarment function
module.exports.getGarment = function getGarment (_, res, __, userId, categoryName, name) {
    Garment.getGarment(userId, categoryName, name)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };
// Handles the editGarment function
module.exports.editGarment = function editGarment (_, res, __, body, userId, categoryName, name) {
  Garment.editGarment(body, userId, categoryName, name)
    .then(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
  };
// Handles the deleteGarment function
module.exports.deleteGarment = function deleteGarment (_, res, __, userId, categoryName, name) {
  Garment.deleteGarment(userId, categoryName, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response.body, response.statusCode);
    });
};