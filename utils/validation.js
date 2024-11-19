const Joi = require("joi");

const validateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    due_date: Joi.date().required(),
    status: Joi.string()
      .valid("pending", "in_progress", "completed")
      .default("pending"),
  });
  return schema.validate(task);
};

module.exports = { validateTask };
