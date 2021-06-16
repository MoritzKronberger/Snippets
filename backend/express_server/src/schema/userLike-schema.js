const userLikeSchema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid"},
        user_id: { type: "string", format: "uuid" },
        post_id: { type: ["string", "null"], format: "uuid" },
        comment_id: { type: ["string", "null"], format: "uuid"}
    },
};

export default userLikeSchema;