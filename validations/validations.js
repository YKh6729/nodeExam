const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    date: { type: "string" },
    attendees: { type: "number" },
  },
  required: ["name", "date", "attendees"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

module.exports = validate;
