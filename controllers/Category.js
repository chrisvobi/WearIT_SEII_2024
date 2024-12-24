'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

module.exports.getCategories = function getCategories (_req, res, _next, userId) {
    Category.getCategories(userId)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  module.exports.getCategoryGarments = function getCategoryGarments (_req, res, _next, userId, categoryName) {
    Category.getCategoryGarments(userId, categoryName)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };

  module.exports.addGarment = function addGarment (_req, res, _next, body, userId, categoryName) {
    Category.addGarment(body, userId, categoryName)
      .then(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      })
      .catch(function (response) {
        utils.writeJson(res, response.body, response.statusCode);
      });
  };