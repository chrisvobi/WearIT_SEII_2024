'use strict';


/**
 * Add a new garment to a specific category for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Add a new garment to a specific category for a user 
 *
 * body Garment Garment model
 * userId String ID of the user
 * categoryName String Name of the category
 * returns Garment
 **/
exports.addGarment = function(body,userId,categoryName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "size" : "size",
  "imagePath" : "imagePath",
  "name" : "name",
  "brand" : "brand"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a new event to the user's calendar
 * FR6-The user must be able to plan their future outfits. 
 *
 * body Event Event model (optional)
 * userId String the id of the user
 * returns Event
 **/
exports.addUserCalendarEvent = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : 6,
  "month" : 0,
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  }, {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  } ],
  "title" : "title",
  "day" : "day"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * The user adds an outfit
 * FR7-The user must be able to save outfits. 
 *
 * body Outfit Outfit model
 * userId String user that creates the outfit
 * returns Outfit
 **/
exports.createOutfit = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "garments" : [ {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  }, {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  } ],
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Remove a specific garment in a specific category for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Remove a specific garment in a specific category for a user 
 *
 * userId String ID of the user
 * categoryName String Name of the category
 * name String Name of the garment
 * returns Error
 **/
exports.deleteGarment = function(userId,categoryName,name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = { };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete outfit from user account
 * FR9 - The user must be able to delete saved outfits. 
 *
 * userId String user that deletes the outfit
 * name String the name of the outfit
 * returns Error
 **/
exports.deleteOutfit = function(userId,name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = { };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a specific event from the user's calendar
 *
 * userId String The unique identifier of the user
 * date String The date of the event
 * eventName String The name of the event
 * returns Error
 **/
exports.deleteUserCalendarEvent = function(userId,date,eventName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = { };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit a specific garment in a specific category for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Edit a specific garment in a specific category for a user 
 *
 * body Garment Garment model
 * userId String ID of the user
 * categoryName String Name of the category
 * name String Name of the garment
 * returns Garment
 **/
exports.editGarment = function(body,userId,categoryName,name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "size" : "size",
  "imagePath" : "imagePath",
  "name" : "name",
  "brand" : "brand"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all categories for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Displays the categories to the user 
 *
 * userId String ID of the user
 * returns List
 **/
exports.getCategories = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "garments" : [ {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  }, {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  } ],
  "name" : "Tops"
}, {
  "garments" : [ {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  }, {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  } ],
  "name" : "Tops"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all garments in a specific category for a user
 * FR1 - The user must be able to manage their virtual wardrobe. Displays the garments of a category to the user 
 *
 * userId String ID of the user
 * categoryName String Name of the category
 * returns List
 **/
exports.getCategoryGarments = function(userId,categoryName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "size" : "size",
  "imagePath" : "imagePath",
  "name" : "name",
  "brand" : "brand"
}, {
  "size" : "size",
  "imagePath" : "imagePath",
  "name" : "name",
  "brand" : "brand"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
  "size" : "size",
  "imagePath" : "imagePath",
  "name" : "name",
  "brand" : "brand"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve outfit
 *
 * userId String the id of the user
 * name String the name of the outfit
 * returns Outfit
 **/
exports.getOutfit = function(userId,name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "garments" : [ {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  }, {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  } ],
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve user's calendar
 * FR6-The user must be able to plan their future outfits. 
 *
 * userId String the id of the user
 * returns List
 **/
exports.getUserCalendar = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : 6,
  "month" : 0,
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  }, {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  } ],
  "title" : "title",
  "day" : "day"
}, {
  "date" : 6,
  "month" : 0,
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  }, {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  } ],
  "title" : "title",
  "day" : "day"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve a specific event from the user's calendar
 * FR6-The user must be able to plan their future outfits. 
 *
 * userId String The unique identifier of the user
 * date String The date of the event
 * eventName String The name of the event
 * returns Event
 **/
exports.getUserCalendarEvent = function(userId,date,eventName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : 6,
  "month" : 0,
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  }, {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  } ],
  "title" : "title",
  "day" : "day"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * The user updates an outfit
 * FR8-The user must be able to edit saved outfits. 
 *
 * body Outfit Outfit model
 * userId String user that updates the outfit
 * name String the name of the outfit
 * returns Outfit
 **/
exports.updateOutfit = function(body,userId,name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "garments" : [ {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  }, {
    "size" : "size",
    "imagePath" : "imagePath",
    "name" : "name",
    "brand" : "brand"
  } ],
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific event in the user's calendar
 *
 * body Event Event model (optional)
 * userId String The unique identifier of the user
 * date String The date of the event
 * eventName String The name of the event
 * returns Event
 **/
exports.updateUserCalendarEvent = function(body,userId,date,eventName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : 6,
  "month" : 0,
  "planndedOutfit" : [ {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  }, {
    "garments" : [ {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    }, {
      "size" : "size",
      "imagePath" : "imagePath",
      "name" : "name",
      "brand" : "brand"
    } ],
    "name" : "name"
  } ],
  "title" : "title",
  "day" : "day"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

