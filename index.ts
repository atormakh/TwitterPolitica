import { logger } from "./logger";
import { connectMongoDB, disconnectMongoDB } from "./mongodb";
import * as dotenv from "dotenv";
import { getAllAcountFollowers } from "./querys/getAllAccountFollowers";
import { getAccountTweets } from "./querys/getAccountTweets";
import { getUsersProfile } from "./twitter_api/twitterApi";

dotenv.config();
export interface Candidate {
  screen_name: string;
  startingCursor?: string;
  id: string;
}
const cabaCanditates: Candidate[] = [
  //{ screen_name: "agustormakh", id: "2416545542" },
  { screen_name: "JMilei", id: "4020276615" },
  { screen_name: "SantoroLeandro", id: "290789612" },
  { screen_name: "mariuvidal", id: "109040582" },
  { screen_name: "myriambregman", id: "332993154" },
];
const bsasCandidates: Candidate[] = [
  { screen_name: "jlespert", id: "351953986" },
  { screen_name: "NicolasdelCano", id: "374115730" },
  { screen_name: "vtolosapaz", id: "244356927" },
  { screen_name: "diegosantilli", id: "34455479" },
  { screen_name: "RandazzoF", id: "137810514" },
  { screen_name: "CynthiaHotton", id: "871917428" },
];

const main = async () => {
  try {
    await connectMongoDB();
    const candidates: Candidate[] = [...cabaCanditates, ...bsasCandidates];
    for (let i = 0; i < candidates.length; i++) {
      const candidate: Candidate = candidates[i];
      await getAccountTweets(candidate);
    }
  } catch (error) {
    logger.error(
      `error trying to do something outside of each users try catch`
    );
    console.log("ERRRORRR===", error);
  } finally {
    await disconnectMongoDB();
  }
};

main();
