import { Candidate } from "..";
import { sleep } from "../helpers/sleep";
import { logger } from "../logger";
import { addMultipleTweets } from "../mongodb";
import { getUserTweets } from "../twitter_api/twitterApi";

export const getAccountTweets = async (candidate: Candidate) => {
  logger.info(`Starting getAllAccountFollowers for ${candidate.screen_name}`);
  let cursor: string | undefined = candidate.startingCursor;
  let errors = 0;
  while (cursor !== "finished") {
    try {
      console.log("doing tweets query");
      const aux: any = await getUserTweets(candidate.id, cursor);
      //console.log("finished tweets query===", aux);
      cursor = aux?.data?.meta?.next_token || "finished";
      errors = 0;
      logger.info(
        `{user:${candidate.screen_name},Tweets length:${aux.data.data.length}, NextCursor:${cursor}}`
      );
      await addMultipleTweets(candidate.screen_name, aux.data.data);
    } catch (error: any) {
      //queremos diferentes conmportamientos si es ETIMEDOUT que si es Too Many Requests
      errors++;
      if (errors < 10) {
        logger.info(`Error number ${errors}`);
        logger.error(error);
        if (error && error.response && error.response.status == 429) {
          logger.info("TOO MANY REQUESTS ERROR. Waiting 15 minutes to resume");
          await sleep(15 * 60 * 1000);
          logger.info("Resuming requests");
        } else {
          await sleep(20 * 1000);
        }
      } else {
        cursor = undefined;
      }
    } finally {
      //que duerma medio segundo y sigue
      await sleep(1 * 1000);
    }
  }
  if (errors == 0) {
    logger.info(
      `Finished succesfully to retrieve all ${candidate.screen_name} followers`
    );
  }
};
