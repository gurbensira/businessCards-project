import Joi from "joi";

const bcardSchema = {
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).allow(""),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string()
        .ruleset.pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'Phone must be a valid Israeli phone number' })
        .required(),
    email: Joi.string()
        .ruleset.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'Email must be a valid email' })
        .required(),
    web: Joi.string()
        .ruleset.pattern(/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/)
        .rule({ message: 'Web must be a valid URL' })
        .required(),
    url: Joi.string()
        .ruleset.pattern(/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/)
        .rule({ message: 'Image URL must be a valid URL' })
        .allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
    state: Joi.string().allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.string().min(1).max(256).required(),
    zip: Joi.string().min(2).max(256).allow(""),
};

export default bcardSchema;