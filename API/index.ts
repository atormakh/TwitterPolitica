import express from 'express';
import { connectMongoDB, disconnectMongoDB, getEngagementAggregation } from '../mongodb';

const app = express();


app.get("/engagement", async (req:any, res:any) => { 
    await connectMongoDB()
    const response = await getEngagementAggregation();
    const result = await response.toArray();
    //console.log("ENGAGEMENT RESPONSE ====",response)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(result);
    await disconnectMongoDB()
    return res;
  });


app.listen(8000, () => {
    console.log("Listening on port 8000")
});