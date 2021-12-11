import credentials from './credentials.json'
import fetch from 'node-fetch';


function getFollowing(userId, bearer, csrf, auth, count) {

    return fetch("https://twitter.com/i/api/graphql/dxq4kpfK7FGemy3zsBCv-Q/Following?variables=%7B%22userId%22%3A%" + userId + "%22%2C%22count%22%3A" + count + "%2C%22withTweetQuoteCount%22%3Afalse%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withUserResults%22%3Atrue%2C%22withNftAvatar%22%3Afalse%2C%22withBirdwatchPivots%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%7D", {
        "headers": {
            "authorization": "Bearer " + bearer,
            "content-type": "application/json",
            "x-csrf-token": csrf,
            "cookie": "auth_token=" + auth + ";ct0=" + csrf,
        },
        "body": null,
        "method": "GET"
    });
}

getFollowing(22141986676, credentials.bearer, credentials.csrf, credentials.auth, 1000).then(response => {
    response.json().then(json => {
        let instructions = json.data.user.result.timeline.timeline.instructions;
        //console.log(instructions);
        let entries = instructions.find(elem => elem.type === "TimelineAddEntries").entries;
        //console.log(entries.length);
        entries.forEach(entry => {
            try{
            console.log(entry.content.itemContent.user_results.result.legacy.screen_name)
            }catch{}
        })
    });
})