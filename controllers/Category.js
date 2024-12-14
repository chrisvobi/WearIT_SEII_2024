'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

module.exports.getCategories = function getCategories (req, res, next, userId) {
    Category.getCategories(userId)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  module.exports.getCategoryGarments = function getCategoryGarments (req, res, next, userId, categoryName) {
    Category.getCategoryGarments(userId, categoryName)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  module.exports.addGarment = function addGarment (req, res, next, body, userId, categoryName) {
    Category.addGarment(body, userId, categoryName)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };