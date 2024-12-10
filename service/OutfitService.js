'use strict';

exports.createOutfit = function(body,userId) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = [];
      if (userId >= 1 && userId <= 1000) {
        examples['application/json'].push(body);
        resolve({
            statusCode: 201,
            message: examples[Object.keys(examples)][0]
        });
      } else if (userId > 1000) {
        reject({
          statusCode: 404,
          message: "User doesnt exist"
        });
      }
    });
  }