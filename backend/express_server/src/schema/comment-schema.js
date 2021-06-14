const commentSchema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        creation_time: { type: ["string", "null"], format:"date-time" },
        content: { type: ["string", "null"] },
        user_id: { type: "string", format: "uuid" },
        post_id: { type: "string", format: "uuid" },
    }
}

export default commentSchema;
