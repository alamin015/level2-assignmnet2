import Joi from 'joi';

// Define Joi schema for fullName
const fullNameValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

// Define Joi schema for address
const addressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

// Define Joi schema for the main user object
const userValidationSchema = Joi.object({
  userId: Joi.number().integer().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: fullNameValidationSchema.required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressValidationSchema.required(),
});

export default userValidationSchema;
