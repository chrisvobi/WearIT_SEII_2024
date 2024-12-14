'use strict';

var utils = require('../utils/writer.js');
var Garment = require('../service/GarmentService');

module.exports.getGarment = function getGarment (req, res, next, userId, categoryName, name) {
    Garment.getGarment(userId, categoryName, name)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  module.exports.editGarment = function editGarment (req, res, next, body, userId, categoryName, name) {
    Garment.editGarment(body, userId, categoryName, name)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  module.exports.deleteGarment = function deleteGarment (req, res, next, userId, categoryName, name) {
    Garment.deleteGarment(userId, categoryName, name)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };