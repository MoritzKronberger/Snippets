/* from https://gitlab.multimedia.hs-augsburg.de/kowa/wk_account_vue_01 */
import axios from "axios";

const options = (method, token, url, data = null) => {
      return {
      method: method,
      url: url,
      data: data,
      validateStatus: false,
      headers: {
        'Accept': "application/json", // 'application/vnd.api+json'
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    };
  },
  json = async (method, token, url, data = null) => {
    const res = await axios(options(method, token, url, data));
    return {
      status: res.status,
      headers: res.headers,
      token: res.headers.authorization
        ? res.headers.authorization.split(" ")[1]
        : token,
      data: res.data,
    };
  };

export async function getJson(token, url) {
  const res = await json("get", token, url);

  if (res.status === 200) {
    return res;
  } else {
    throw new Error(`'${url}' not found`);
  }
}

export async function postJson(token, url, data) {
  return await json("post", token, url, data);
}

export async function patchJson(token, url, data) {
  return await json("patch", token, url, data);
}

export async function deleteJson(token, url, data) {
  return await json("delete", token, url, data);
}

export default { getJson, postJson };
