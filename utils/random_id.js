// Generate a random integer between min (inclusive) and max (exclusive)

exports.generateRandomID = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}