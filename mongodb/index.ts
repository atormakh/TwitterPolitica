import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "twitter";
enum Collections {
  FOLLOWERS = "followers",
  TWEETS = "tweets",
}
async function connectMongoDB() {
  await client.connect();
}

async function disconnectMongoDB() {
  await client.close();
}

async function addMultipleFollowers(followed: string, followers: string[]) {
  if (followers && followers.length && followers.length > 0) {
    await client
      .db(dbName)
      .collection(Collections.FOLLOWERS)
      .insertMany(
        followers.map((elem) => ({ followed: followed, follower: elem }))
      );
  } else {
    console.log("MONGODB stopped from trying to insert an empty array");
  }
}

async function addMultipleTweets(twitAuthor: string, tweets: any[]) {
  if (twitAuthor && tweets && tweets.length > 0) {
    await client
      .db(dbName)
      .collection(Collections.TWEETS)
      .insertMany(
        tweets.map((tweet) => {
          const { id, ...mongodbTweet } = tweet;
          return { ...mongodbTweet, _id: id, author: twitAuthor };
        })
      );
  }
}

export {
  connectMongoDB,
  disconnectMongoDB,
  addMultipleFollowers,
  addMultipleTweets,
};
