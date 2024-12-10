// Function checks if an object follows the outfit schema
exports.outfit_check = function (outfit) {
    return (
        typeof outfit === "object" &&
        outfit !== null &&
        "name" in outfit &&
        typeof outfit.name === "string" &&
        "garments" in outfit &&
        Array.isArray(outfit.garments) &&
        outfit.garments.length === 3 &&
        outfit.garments.every(garment =>
            typeof garment === "object" &&
            garment !== null &&
            "size" in garment && typeof garment.size === "string" &&
            "imagePath" in garment && typeof garment.imagePath === "string" &&
            "name" in garment && typeof garment.name === "string" &&
            "brand" in garment && typeof garment.brand === "string"
        )
    );
};
