
import { useEffect, useState } from "react"
import * as NeoVis from "neovis.js"
import { TextField } from "@mui/material"
import "./index.scss"

const sharedQuery = (limit,count) => `
match(c:Candidate)
call{
    with c
    match(c) -[r:shared]->(f:Followed) 
    return f  order by r.count desc limit ${limit}
} with c,f

match(c)-[r2:shared]->(f) where r2.count >= ${count} return c,r2,f`

function drawGraph(id, query) {
    var config = {
        container_id: id,
        server_url: "bolt://localhost:7687",
        server_user: "",
        server_password: "",
        labels: {
            "User": {
                "size": "size",
                "title_properties": ["follows"],
                "caption": "id",
                "font": {
                    "size": 8
                },
                "community": "follows"

            },
            "Candidate": {

                "caption": "screen_name",
                "size": "size",
                "font": {
                    "size": 20,
                },
                "color": "red"

            },
            "Followed": {

                "caption": "screen_name",
                "size": "size",
                "font": {
                    "size": 20,
                },
                "color": "red"

            }
        },
        relationships: {
            "follows": {
                "thickness": "weight",
                "caption": false,
            },
            "shared": {
                "thickness": "count",
                "caption": false,
            },
        },
        "hierarchical": false,
        "hierarchical_sort_method": "directed",
        initial_cypher: query
    };

    let viz = new NeoVis.default(config);
    viz.render();
}


export default function Shared() {
    const [limit, setLimit] = useState(10);
    const [count, setCount] = useState(60);

    useEffect(() => {
        drawGraph("viz2", sharedQuery(limit,count));
    }, [limit,count])

    return (
        <div>
            <div className="sharedSection">
                <TextField
                    id="limit-number"
                    label="limit"
                    type="number"
                    value={limit}
                    className="number-input"
                    inputProps={{
                        "min": 1
                    }}
                    onChange={(v) => { setLimit(v.target.value) }} />
                <TextField
                    id="count-number"
                    label="count"
                    type="number"
                    value={count}
                    className="number-input"
                    inputProps={{
                        "min": 0,
                        "max": 100
                    }}
                    onChange={(v) => { setCount(v.target.value) }} />
            </div>
            <div id="viz2" style={{ height: "80vh" }} />
        </div>
    )
}


