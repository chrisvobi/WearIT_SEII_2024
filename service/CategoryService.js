'use strict';

exports.getCategories = function(userId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [
        { "name": "Jackets" },
        { "name": "Tops" },
        { "name": "Pants" },
        { "name": "Shoes" },
        { "name": "Accessories" }
      ];
      if (userId >= 1 && userId <= 100) {
        resolve({
            body: examples[Object.keys(examples)[0]],
            statusCode: 200
          });
      } else if (userId > 120) {
        reject({
          statusCode: 404,
          body: "User doesn't exist"
        });
      } else if (userId < 1) {
        reject({
          statusCode: 400,
          body: "User Id should be greater than 1"
        });
      } else if (!Number.isInteger(userId)) {
        reject({
          statusCode: 400,
          body: "User Id should be integer"
        });
      }
    });
  }