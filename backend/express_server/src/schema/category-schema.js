const categorySchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
  },
};

export default categorySchema;
