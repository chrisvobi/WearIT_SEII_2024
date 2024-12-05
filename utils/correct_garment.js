// Checks if a given garment has correct data

exports.correct_garment = function (message) {
    return (
        typeof message === "object" &&
        message !== null &&
        "size" in message &&
        typeof message.size === "string" &&
        "imagePath" in message &&
        typeof message.imagePath === "string" &&
        "name" in message &&
        typeof message.name === "string" &&
        "brand" in message &&
        typeof message.brand === "string"
    );
};
