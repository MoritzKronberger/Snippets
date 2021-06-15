const hasCategorySchema = {
  type: "object",
  properties: {
    post_id: { type: "string", format: "uuid" },
    category_id: { type: "string", format: "uuid" },
  },
};

export default hasCategorySchema;
