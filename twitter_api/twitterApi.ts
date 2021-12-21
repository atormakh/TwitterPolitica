import axios from "axios";

//ponerle de dafault url "https://api.twitter.com/"
//agregarle por default el Bearer Token de twitter developer

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

async function getUserTweets(
  userId: string,
  cursor?: string,
  bearer_token?: string
) {
  if (!userId) return;
  let uri: string = `https://api.twitter.com/2/users/${userId}/tweets?expansions=referenced_tweets.id&tweet.fields=author_id,public_metrics,reply_settings,text,id,referenced_tweets&max_results=100`;
  if (cursor) uri += `&pagination_token=${cursor}`;

  return await axios.get(uri, {
    headers: {
      Authorization: `Bearer ${
        bearer_token || process.env.TWITTER_API_BEARER_TOKEN
      }`,
    },
  });
}

async function getUsersProfile(usernames: string[]) {
  return await twitter.get(
    `https://api.twitter.com/2/users/by?usernames=${usernames.map(
      (item) => item
    )}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_BEARER_TOKEN}`,
      },
    }
  );
}

export {
  getFollowersList,
  getUserProfileFromIds,
  getUserTweets,
  getUsersProfile,
};
