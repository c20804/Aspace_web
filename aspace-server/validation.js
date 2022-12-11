const Joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).required().email(),
        password: joiPassword
                        .string()
                        .minOfSpecialCharacters(1)
                        .minOfLowercase(1)
                        .minOfUppercase(1)
                        .minOfNumeric(1)
                        .noWhiteSpaces()
                        .messages({
                              'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                              'password.minOfSpecialCharacters':
                                    '{#label} should contain at least {#min} special character',
                              'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                              'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                              'password.noWhiteSpaces': '{#label} should not contain white spaces',
                        }),
        name: Joi.string().min(3).max(50).required(),
        role: Joi.string().required().valid("guest", "host"),
    });

    return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).required().email(),
        password: joiPassword
                        .string()
                        .minOfSpecialCharacters(1)
                        .minOfLowercase(1)
                        .minOfUppercase(1)
                        .minOfNumeric(1)
                        .noWhiteSpaces()
                        .messages({
                              'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                              'password.minOfSpecialCharacters':
                                    '{#label} should contain at least {#min} special character',
                              'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                              'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                              'password.noWhiteSpaces': '{#label} should not contain white spaces',
                        }),
    });

    return schema.validate(data);
};

const propertyValidation = (data) => {
      const schema = Joi.object({
            title: Joi.string().min(3).max(50).required(),
            type: Joi.string().min(3).max(50).required(),
            price: Joi.number().min(1).max(999).required(),
            image: Joi.string().min(3).max(50).required(),
            city: Joi.string().min(3).max(50).required(),
            address: Joi.string().min(3).max(50).required(),
            postalCode: Joi.number().min(10000).max(99999).required(),
            description: Joi.string().min(6).max(255).required(),
            amenities: Joi.string().min(6).max(255).required(),
      });
      return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.propertyValidation = propertyValidation;