'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.addGarment = function addGarment (req, res, next, body, userId, categoryName) {
  Default.addGarment(body, userId, categoryName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addUserCalendarEvent = function addUserCalendarEvent (req, res, next, body, userId) {
  Default.addUserCalendarEvent(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createOutfit = function createOutfit (req, res, next, body, userId) {
  Default.createOutfit(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteGarment = function deleteGarment (req, res, next, userId, categoryName, name) {
  Default.deleteGarment(userId, categoryName, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteOutfit = function deleteOutfit (req, res, next, userId, name) {
  Default.deleteOutfit(userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserCalendarEvent = function deleteUserCalendarEvent (req, res, next, userId, date, eventName) {
  Default.deleteUserCalendarEvent(userId, date, eventName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editGarment = function editGarment (req, res, next, body, userId, categoryName, name) {
  Default.editGarment(body, userId, categoryName, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCategories = function getCategories (req, res, next, userId) {
  Default.getCategories(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCategoryGarments = function getCategoryGarments (req, res, next, userId, categoryName) {
  Default.getCategoryGarments(userId, categoryName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGarment = function getGarment (req, res, next, userId, categoryName, name) {
  Default.getGarment(userId, categoryName, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOutfit = function getOutfit (req, res, next, userId, name) {
  Default.getOutfit(userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserCalendar = function getUserCalendar (req, res, next, userId) {
  Default.getUserCalendar(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserCalendarEvent = function getUserCalendarEvent (req, res, next, userId, date, eventName) {
  Default.getUserCalendarEvent(userId, date, eventName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateOutfit = function updateOutfit (req, res, next, body, userId, name) {
  Default.updateOutfit(body, userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUserCalendarEvent = function updateUserCalendarEvent (req, res, next, body, userId, date, eventName) {
  Default.updateUserCalendarEvent(body, userId, date, eventName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
