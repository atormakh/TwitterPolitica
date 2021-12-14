
import { useEffect, useState } from "react"
//import { useLocation } from "react-router-dom";
import * as NeoVis from "neovis.js"
import { IconButton,Select, MenuItem, TextField, Table, TableHead, TableCell, TableRow, TableBody, CircularProgress, Collapse } from "@mui/material"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import * as neo4j from "neo4j-driver"
import "./index.scss"
const uri = "neo4j://localhost:7687"
const driver = neo4j.driver(uri)
const session = driver.session()

const avgQuery = "match(n:User) with n, size((n)--()) as relCount return avg(relCount)";
const interQuery = (c1, c2, min, max) => `match(c1:Candidate{screen_name:"${c1}"}) <-[r1]-(u:User)-[r2]->(c2:Candidate{screen_name:"${c2}"}) where u.follows>=${min} and u.follows<=${max} return c1,c2,u,r1,r2 limit 50`
const tableQuery = "match(c1:Candidate)<-[]-(u:User)-[]->(c2:Candidate) where c1.screen_name < c2.screen_name with c1,c2, count(u) as q return c1.screen_name, c2.screen_name,q"
const candidates = ["mariuvidal", "jlespert", "NicolasdelCano", "JMilei", "diegosantilli", "RandazzoF", "SantoroLeandro", "myriambregman", "vtolosapaz", "CynthiaHotton"]

function drawGraph(query) {
    var config = {
        container_id: "viz",
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
                    "size": 12,
                },
                "color": "red"

            }
        },
        relationships: {
            "follows": {
                "thickness": "weight",
                "caption": false,
            },
        },
        "hierarchical": false,
        initial_cypher: query
    };

    let viz = new NeoVis.default(config);
    viz.render();
}


export default function Neo4j() {
    //const location = useLocation();
    const [avg, setAvg] = useState(0);
    const [candidate1, setCandidate1] = useState(candidates[0]);
    const [candidate2, setCandidate2] = useState(candidates[1]);
    const [min, setMin] = useState(2);
    const [max, setMax] = useState(10);
    const [table, setTable] = useState(undefined);
    const [open, setOpen] = useState(true);
    const load = async () => {
        let r = await session.writeTransaction(tx => tx.run(avgQuery));
        let avg = parseFloat(r.records[0]._fields[0])
        setAvg(avg.toFixed(2))
        r = await session.writeTransaction(tx => tx.run(tableQuery));
        setTable(r.records.map(r => { return { c1: r._fields[0], c2: r._fields[1], q: Number(r._fields[2]) } }).sort((c1, c2) => { return c2.q - c1.q }))
    }
    useEffect(() => {
        load();

    }, [])
    // useEffect(() => {

    //     let params = new URLSearchParams(location.search)
    //     drawGraph(params.get("q"));

    // }, [location])

    useEffect(() => {
        drawGraph(interQuery(candidate1, candidate2, min, max));
    }, [candidate1, candidate2, min, max])

    useEffect(() => {
        console.log(table)
    }, [table])

    return (
        <div>
            <h3>El promedio de candidatos seguidos por los usuarios es {avg}</h3>
            <div class="collapsible" className="tableSection">
                <IconButton onClick={()=>{setOpen(!open)}}>
                {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Collapse in={open}>
                    {table ? <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Candidato 1</TableCell>
                                <TableCell>Candidato 2</TableCell>
                                <TableCell>Intersección</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.c1}</TableCell>
                                    <TableCell>{row.c2}</TableCell>
                                    <TableCell>{row.q}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> : <CircularProgress />}
                </Collapse>
            </div>
            <div className="interSection">
                <Select
                    id="candidate1Select"
                    value={candidate1}
                    onChange={v => setCandidate1(v.target.value)}
                >

                    {candidates.map(candidate => {
                        return (
                            <MenuItem key={candidate} value={candidate}>{candidate}</MenuItem>
                        )
                    })}

                </Select>
                <Select
                    id="candidate2Select"
                    value={candidate2}
                    onChange={v => setCandidate2(v.target.value)}
                >

                    {candidates.map(candidate => {
                        return (
                            <MenuItem key={candidate} value={candidate}>{candidate}</MenuItem>
                        )
                    })}

                </Select>
                <TextField
                    id="min-number"
                    label="min"
                    type="number"
                    value={min}
                    className="number-input"
                    inputProps={{
                        "min": 2
                    }}
                    onChange={(v) => { setMin(v.target.value) }} />
                <TextField
                    id="max-number"
                    label="max"
                    type="number"
                    value={max}
                    className="number-input"
                    inputProps={{
                        "min": parseInt(min) + 1,
                        "max": candidates.length
                    }}
                    onChange={(v) => { setMax(v.target.value) }} />
            </div>
            <div id="viz" style={{ height: "70vh" }} />
        </div>
    )
}


