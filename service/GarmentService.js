/**
 * Get a specific garment in a specific category for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Retrieve a specific garment in a specific category for a user. 
 *
 * userId String ID of the user
 * categoryName String Name of the category
 * name String Name of the garment
 * returns Garment
 **/
exports.getGarment = function(userId,categoryName,name) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
        "Tops": [
          {
            "size": "M",
            "imagePath": "../images/45/Black_Hoodie.jpeg",
            "name": "Black Hoodie",
            "brand": "Nike"
          },{
            "size" : "M",
            "imagePath" : "../images/45/Grey_Crewneck.jpeg",
            "name" : "Grey Crewneck",
            "brand" : "Zara"
          }
        ],
        "Shoes": [
          {
            "size" : "41",
            "imagePath" : "../images/57/White_Shoes.jpeg",
            "name" : "White Shoes",
            "brand" : "Converse"
          },{
            "size" : "40",
            "imagePath" : "../images/57/White_Airforce_Shoes.jpeg",
            "name" : "White Airforce Shoes",
            "brand" : "Nike"
          }
        ]
      };
      if ( userId < 1 || userId > 100) {
        reject({
            body: "User doesn't exist",
            statusCode: 400
        });
      } else if (categoryName === "Tops" && name === "Black Hoodie") {
        resolve({
            body: examples[Object.keys(examples)][categoryName][0],
            statusCode: 200
        });
      } else if (categoryName === "Shoes" && name === "White Airforce Shoes") {
        resolve({
            body: examples[Object.keys(examples)][categoryName][1],
            statusCode: 200
        });
      }  else if (categoryName !== "Shoes" && categoryName !== "Tops") {
        reject({
            body: "Category doesn't exist",
            statusCode: 400
        });
      } else if (categoryName === "Tops" && name !== "Black Hoodie") {
        reject({
            body: "Garment doesn't exist",
            statusCode: 400
        });
      }
    });
  }
  