const {MongoClient} = require("mongodb")

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "twitter";
const collectionName= "followers";
async function connectMongoDB(){
    await client.connect();
}

async function disconnectMongoDB(){
    await client.close();
}

async function addMultipleFollowers(followed:string,followers:string[]){
    if(followers && followers.length && followers.length>0){
            await client.db(dbName).collection(collectionName)
        .insertMany(followers.map(elem => 
            ({"followed":followed, "follower":elem})))
    }else{
        console.log("MONGODB stopped from trying to insert an empty array");
    }

}

export {connectMongoDB,disconnectMongoDB,addMultipleFollowers}