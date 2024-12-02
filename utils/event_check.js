// Function checks if message is following the event schema

exports.event_check = function (message) {
    return (
        typeof message === "object" &&
        message !== null &&
        "date" in message &&
        "day" in message &&
        "month" in message &&
        "title" in message &&
        Array.isArray(message.planndedOutfit) &&
        message.planndedOutfit.length === 1 &&
        typeof message.planndedOutfit[0] === "object" &&
        "garments" in message.planndedOutfit[0] &&
        "name" in message.planndedOutfit[0] &&
        Array.isArray(message.planndedOutfit[0].garments) &&
        message.planndedOutfit[0].garments.length === 3 &&
        message.planndedOutfit[0].garments.every(garment =>
            typeof garment === "object" &&
            "size" in garment &&
            "imagePath" in garment &&
            "name" in garment &&
            "brand" in garment
        )
    );
}