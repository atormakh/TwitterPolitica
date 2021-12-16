
import { exec } from './worker'
import { Client } from 'pg'
import { connectMongoDB, disconnectMongoDB } from '../mongodb';

const client = new Client({
    user: "postgres",
    password: "postgres",
    database: "twitter",
    port: 5432,
    ssl: false,
    host: "localhost"
})



async function main() {
    await client.connect()
    await connectMongoDB();
    
    // try {
    //     await client.connect()
    // } catch (error) {

    // } finally {
    //     await client.disconnect()
    // }
    console.log("fetching followers list");

    const candidates: any[] = [
        { screen_name: "JMilei", id: "4020276615" },
        { screen_name: "SantoroLeandro", id: "290789612" },
        { screen_name: "mariuvidal", id: "109040582" },
        { screen_name: "myriambregman", id: "332993154" },
        { screen_name: "jlespert", id: "351953986" },
        { screen_name: "NicolasdelCano", id: "374115730" },
        { screen_name: "vtolosapaz", id: "244356927" },
        { screen_name: "diegosantilli", id: "34455479" },
        { screen_name: "RandazzoF", id: "137810514" },
        { screen_name: "CynthiaHotton", id: "871917428" },
    ];

    let followers: any[] = [];

    let queries: any[] = [];
    candidates.forEach((c) => {
        let t: any = client.query(`SELECT distinct follower from followers where followed='${c.screen_name}'`).then((users: any) => {
            users = users.rows.map((row: any) => row.follower);
            c.followers = users;
            c.id = 0;
        })
        queries.push(t);


    });

    await Promise.allSettled(queries);


    console.log("queue...")

    let index = 0;
    const consume = () => {
        let c = candidates[index++ % candidates.length];
        c.id++;
        return c.followers.pop();
    }

    const POOL_SIZE = 10;

    let tasksArray: any[] = [];

    console.log("init executions")

    const execute = async () => {
        let fetched = new Set();
        while (1) {
            for (let i = 0; i < POOL_SIZE; i++) {
                let follower = undefined;
                while (fetched.has(follower) || !follower)
                    follower = consume();
                fetched.add(follower);

                let task = exec(follower);
                tasksArray.push(task)
            }
            await Promise.allSettled(tasksArray)
            console.log("batch finished")
            tasksArray = [];
        }

    }

    await execute();
    await disconnectMongoDB()
}
main();



