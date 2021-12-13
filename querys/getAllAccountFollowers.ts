import { Candidate } from "..";
import { sleep } from "../helpers/sleep";
import { logger } from "../logger";
import { addMultipleFollowers } from "../mongodb";
import { getFollowersList } from "../twitter_api/twitterApi";

const res = async (screen_name: string, cursor: any) => {
  const aux = await getFollowersList(screen_name, cursor);
  return aux;
};

export const getAllAcountFollowers = async (candidate: Candidate) => {
  logger.info(`Starting getAllAccountFollowers for ${candidate.screen_name}`);
  let cursor: string | undefined = candidate.startingCursor || "-1";
  let errors = 0;
  while (cursor && cursor !== "0") {
    try {
      var aux: any = await res(candidate.screen_name, cursor);

      cursor = aux.data.next_cursor_str;
      errors = 0;
      logger.info(
        `{user:${candidate.screen_name},IDs length:${aux.data.ids.length}, NextCursor:${cursor}}`
      );
      await addMultipleFollowers(candidate.screen_name, aux.data.ids);
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
      await sleep(75 * 1000);
    }
  }
  if (errors == 0) {
    logger.info(
      `Finished succesfully to retrieve all ${candidate.screen_name} followers`
    );
  }
};
