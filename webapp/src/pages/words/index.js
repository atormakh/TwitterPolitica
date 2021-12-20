
import { useEffect, useState } from "react"
import ReactWordcloud from 'react-wordcloud';
import { CircularProgress, Select, MenuItem } from "@mui/material";

const candidates = ["mariuvidal", "jlespert", "NicolasdelCano", "JMilei", "diegosantilli", "RandazzoF", "SantoroLeandro", "myriambregman", "vtolosapaz", "CynthiaHotton"]



let url = "http://localhost:9200/twittar_tweets_final/_search";
let query = candidate => (
    {
        "match": {
            "author": { "query": candidate }
        }
    })
let body = candidate => {
    let  body = {
        "size": 0,
            "aggs": {
            "keywords": {

                "significant_text": {
                    "filter_duplicate_text": true,
                        "field": "text",
                            "size": 100
                }
            }
        }
    }

    if(candidate) body.query = query(candidate)
    return body
}

const LENGTH = 3;

const C = 10
const max = 255;
const min = 175;
let colors = []
for (let i = 0; i < C; i++) {
    let random = Math.floor(Math.random() * (max - min)) + min;
    colors.push(`hsl(${random},100%,50%,1)`)
}



export default function Words() {
    const [words, setWords] = useState(undefined);
    const [candidate, setCandidate] = useState(0);

    const load = async candidate => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify(body(candidate))
        })
        const json = await response.json();
        let words = json.aggregations.keywords.buckets.filter(entry => entry.key.length > LENGTH).map(entry => ({ text: entry.key, value: entry.doc_count }))
        setWords(words)
    }

    useEffect(() => {
        load(candidate);
    }, [candidate])

    return (
        <div>
            <p>Seleccione un candidato para ver las palabras mas frecuentes en sus tweets</p>
            <Select
                id="candidateSelect"
                value={candidate}
                onChange={v => setCandidate(v.target.value)}
            >
                <MenuItem key={candidate} value={0}>All</MenuItem>
                {candidates.map(candidate => {
                    return (
                        <MenuItem key={candidate} value={candidate}>{candidate}</MenuItem>
                    )
                })}
            </Select>
            {words ? <ReactWordcloud options={{ rotations: 0, fontFamily:"sans-serif", fontSizes: [12, 60], scale: 'sqrt', colors: colors }} words={words} /> : <CircularProgress />}
        </div>
    )
}


