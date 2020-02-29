module.exports = (errorMessage, HTTPCode) => Object.assign(new Error(), { errorMessage, HTTPCode });
