// Dummy database with garments in categories of users

module.exports = () => ({
    'application/json': {
      "45": {
        "Tops": [
          {
            "size": "M",
            "imagePath": "../images/45/Black_Hoodie.jpeg",
            "name": "Black Hoodie",
            "brand": "Nike",
          },
          {
            "size": "M",
            "imagePath": "../images/45/Grey_Crewneck.jpeg",
            "name": "Grey Crewneck",
            "brand": "Zara",
          },
        ],
      },
      "57": {
        "Shoes": [
          {
            "size": "41",
            "imagePath": "../images/57/White_Shoes.jpeg",
            "name": "White Shoes",
            "brand": "Converse",
          },
          {
            "size": "40",
            "imagePath": "../images/57/White_Airforce_Shoes.jpeg",
            "name": "White Airforce Shoes",
            "brand": "Nike",
          },
        ],
      },
    },
  });
  