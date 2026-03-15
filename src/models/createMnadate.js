const Joi = require('joi');

class CreateMandateRequest {

  static schema = Joi.object({

    user_id: Joi.string()
      .guid({ version: ['uuidv4', 'uuidv5'] })
      .required()
      .messages({
        "string.guid": "user_id must be a valid UUID",
        "any.required": "user_id is required"
      }),

    bank_account_id: Joi.string()
      .guid({ version: ['uuidv4', 'uuidv5'] })
      .required()
      .messages({
        "string.guid": "bank_account_id must be a valid UUID",
        "any.required": "bank_account_id is required"
      }),

    max_amount: Joi.number()
      .positive()
      .required()
      .messages({
        "number.base": "max_amount must be a number",
        "number.positive": "max_amount must be greater than 0",
        "any.required": "max_amount is required"
      }),

    currency: Joi.string()
      .length(3)
      .required()
      .messages({
        "string.length": "currency must be a 3 letter code (example: INR)",
        "any.required": "currency is required"
      }),

    frequency: Joi.string()
      .valid("AS_PRESENTED", "DAILY", "MONTHLY")
      .required()
      .messages({
        "any.only": "frequency must be AS_PRESENTED, DAILY or MONTHLY",
        "any.required": "frequency is required"
      }),

    validity_start: Joi.date()
      .iso()
      .required()
      .messages({
        "date.base": "validity_start must be a valid date",
        "any.required": "validity_start is required"
      }),

    validity_end: Joi.date()
      .iso()
      .greater(Joi.ref("validity_start"))
      .required()
      .messages({
        "date.base": "validity_end must be a valid date",
        "date.greater": "validity_end must be after validity_start",
        "any.required": "validity_end is required"
      }),

    purpose: Joi.string()
      .valid("GOAL_SAVINGS", "INVESTMENT_ROUTING", "GOLD_PURCHASE")
      .required()
      .messages({
        "any.only": "purpose must be GOAL_SAVINGS, INVESTMENT_ROUTING, or GOLD_PURCHASE",
        "any.required": "purpose is required"
      }),

    metadata: Joi.object({
      app_version: Joi.string().messages({
        "string.base": "metadata.app_version must be a string"
      }),

      platform: Joi.string()
        .valid("android", "ios", "web")
        .messages({
          "any.only": "platform must be android, ios or web"
        })
    }).optional()

  });

  static validate(payload) {

    const { error, value } = this.schema.validate(payload, {
      abortEarly: false
    });

    if (error) {
      const errors = {"error": error.details.map(detail => detail.message)};
      //throw new Error(errors.join(", "));
      return errors;
    }

    return value;
  }

}

module.exports = CreateMandateRequest;