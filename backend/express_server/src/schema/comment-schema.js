const commentSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    content: { type: ["string", "null"] },
    user_id: { type: "string", format: "uuid" },
    post_id: { type: "string", format: "uuid" },
  },
};

export default commentSchema;
