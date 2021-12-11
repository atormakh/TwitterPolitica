import axios from "axios";

//ponerle de dafault url "https://api.twitter.com/"
//agregarle por default el Bearer Token de twitter developer
const tokenAGUSTORMAKH =
  "AAAAAAAAAAAAAAAAAAAAAJFQVQEAAAAAjTIQW8oHDX4fVz2qdf9n%2FFlB0DI%3DhExDAb6LlqGZpR55801JJZXevj4UWxc9c8Qgg3g2SIMCk4rK2d";
const tokenATORMAKH =
  "AAAAAAAAAAAAAAAAAAAAABktVwEAAAAAL%2BQ2G9A0YAxOmUp7VZjAJDnp464%3DkbDT2rRRWXTFQKlIAOC2eNFAEEWXedpMxAtOCzHzY3x64BUTQ8";
const twitter = axios.create({
  baseURL: "https://api.twitter.com/",
  headers: {
    Authorization: `Bearer ${process.env.TWITTER_API_BEARER_TOKEN}`,
  },
});

async function getFollowersList(screen_name: string, cursor: string) {
  //console.log('TOKEN ===', process.env.TWITTER_API_BEARER_TOKEN)
  const uri: string = `1.1/followers/ids.json?cursor=${cursor}&screen_name=${screen_name}&stringify_ids=true`;
  return await twitter.get(uri);
}

async function getUserProfileFromIds(userIds: string[], bearer_token?: string) {
  if (!userIds || userIds.length > 100) {
    return;
  }
  const uri: string = `/1.1/users/lookup.json?user_id=${userIds.map(
    (value) => value
  )}`; //`/1.1/users/lookup.json?user_id=783214,6253282`;
  return await twitter.get(uri, {
    headers: {
      Authorization: `Bearer ${
        bearer_token || process.env.TWITTER_API_BEARER_TOKEN
      }`,
    },
  });
}

export { getFollowersList, getUserProfileFromIds };
