import { credentials } from './credentials'
import axios from 'axios';
import { sleep } from '../helpers/sleep'
import { addMultipleFollowings } from '../mongodb/index'
let hasToSleep = false;
let twitterRateReset = 0;



function sleepUntilRateReset(dateUTC: any) {
    const sleepTime = Math.abs(new Date(dateUTC * 1000).getTime() - new Date().getTime())
    return sleep(sleepTime)
}

function getFollowing(userId: any, bearer: string, csrf: string, auth: string, count: Number) {

    return axios.get("https://twitter.com/i/api/graphql/dxq4kpfK7FGemy3zsBCv-Q/Following?variables=%7B%22userId%22%3A%22" + userId + "%22%2C%22count%22%3A" + count + "%2C%22withTweetQuoteCount%22%3Afalse%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withUserResults%22%3Atrue%2C%22withNftAvatar%22%3Afalse%2C%22withBirdwatchPivots%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%7D", {
        "headers": {
            "authorization": "Bearer " + bearer,
            "content-type": "application/json",
            "x-csrf-token": csrf,
            "cookie": "auth_token=" + auth + ";ct0=" + csrf,
        },
        //"body": null,
        //"method": "GET"
    });
}


async function getFollow(follower: number): Promise<any> {
    let response;
    try {
        response = await getFollowing(follower, credentials.bearer, credentials.csrf, credentials.auth, 9999)
    } catch (error:any) {
        console.log(error.response.status)
        if (error.response.status == 429) {
            let reset = error.response.headers["x-rate-limit-reset"]
            console.log("too many requests")
            console.log(error.response.headers["x-rate-limit-remaining"])
            console.log(reset)
            await sleepUntilRateReset(Number(reset));
            return getFollow(follower);
        }
        return;

    }

    let json: any = await response.data;
    let instructions = json.data.user.result.timeline.timeline.instructions;
    let entries = instructions.find((elem: any) => elem.type === "TimelineAddEntries").entries;
    return entries.map((entry: any) => {
        try {
            return entry.content.itemContent.user_results.result.legacy.screen_name;
        } catch { return undefined }
    })
}


//const insert = async (follower: string, followed: string) => await client.query(`insert into followings values(${follower},'${followed}')`)


export async function exec(follower: number) {
    try {
        // if (!hasToSleep) {
        //     let followings = await getFollow(follower);
        // } else {
        //     awiat()
        // }

        let followings = await getFollow(follower);
        let tasks: any[] = [];
        // followings.forEach(followed => {
        //     tasks.push(insert(follower, followed))
        // })
        addMultipleFollowings(follower, followings)
        await Promise.allSettled(tasks);
    } catch (e) {
        console.log("ERROR===",e)
    }

}







