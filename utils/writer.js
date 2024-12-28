// Define a ResponsePayload constructor function to hold code and payload data
var ResponsePayload = function(code, payload) {
  this.code = code;         // HTTP response code (e.g., 200, 404)
  this.payload = payload;   // The data to be returned in the response
}

// Helper function that creates a ResponsePayload object with the given code and payload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);  // Return a new ResponsePayload object
}

// Define the writeJson function to send a JSON response
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;      // Initialize a variable to hold the HTTP status code
  var payload;   // Initialize a variable to hold the response payload

  // If the first argument is an instance of ResponsePayload, call writeJson recursively
  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code); // Recursively call writeJson with the payload and code
    return; // Exit the current function
  }

  // Check if the second argument is a valid HTTP status code (integer)
  if(arg2 && Number.isInteger(arg2)) {
    code = arg2; // Assign the second argument as the response code
  }
  else {
    // If the second argument is not provided, check if the first argument is a valid code
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1; // Assign the first argument as the response code
    }
  }

  // Assign payload if a valid argument is provided
  if(code && arg1) {
    payload = arg1; // Set payload to the first argument if both code and argument are valid
  }
  else if(arg1) {
    payload = arg1; // Otherwise, set payload to the first argument if only it is present
  }

  // If no code is provided, default to HTTP status code 200 (OK)
  if(!code) {
    code = 200; // Default status code
  }

  // If the payload is an object, stringify it for JSON format
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2); // Convert object to a formatted JSON string
  }

  // Set the response HTTP headers and send the JSON payload
  response.writeHead(code, {'Content-Type': 'application/json'}); // Set the Content-Type to JSON
  response.end(payload); // End the response and send the payload
}
