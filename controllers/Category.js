'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

// Controller for the Category 
// Handles all functions related to categories

module.exports.getCategories = function getCategories (_, res, _next, userId) {
    Category.getCategories(userId)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
        _next();
      });
  };

  module.exports.getCategoryGarments = function getCategoryGarments (_, res, _next, userId, categoryName) {
    Category.getCategoryGarments(userId, categoryName)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
        _next();
      });
  };

  module.exports.addGarment = function addGarment (_, res, _next, body, userId, categoryName) {
    Category.addGarment(body, userId, categoryName)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
        _next();
      });
  };