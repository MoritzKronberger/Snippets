/* template: https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_express_01 */

const accountSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    username: { type: ["string", "null"] },
    password: { type: ["string", "null"] },
    //TODO: Add Type restriction for profile picture here
    profile_picture: { type: ["null"] },
  },
};

export default accountSchema;
