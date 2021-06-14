const postSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    //TODO: add data type for creation_time
    creation_time: { type: ["string", "null"], format:"date-time" },
    title: { type: ["string", "null"] },
    content: { type: ["string", "null"] },
    language_id: { type: ["string", "null"], format: "uuid" },
    user_id: { type: "string", format: "uuid" },
  },
};

export default postSchema;
