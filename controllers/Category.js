'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

module.exports.getCategories = async function getCategories (req, res, next, userId) {
    await Category.getCategories(userId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  module.exports.getCategoryGarments = async function getCategoryGarments (req, res, next, userId, categoryName) {
    await Category.getCategoryGarments(userId, categoryName)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };