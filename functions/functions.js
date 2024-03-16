const validator = require('validator')

exports.isPasswordValid = (password) => {

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-])[0-9a-zA-Z!@#$%^&*()_+-]{8,16}$/;

    return validator.matches(password, passwordPattern);
}
exports.isAlpha = (string) => {

    const stringPattern = /^[a-zA-Z ]{3,}$/;

    return validator.matches(string, stringPattern);
}