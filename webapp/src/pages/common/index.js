
import { useEffect, useState } from "react"
import { Table, TableHead, TableCell, TableRow, TableBody, CircularProgress } from "@mui/material"
import * as neo4j from "neo4j-driver"

const uri = "neo4j://localhost:7687"
const driver = neo4j.driver(uri)
const session = driver.session()

const avgQuery = "match(n:User) with n, size((n)--(:Candidate)) as relCount return avg(relCount)";
const tableQuery = "match(c1:Candidate)<-[]-(u:User)-[]->(c2:Candidate) where c1.screen_name < c2.screen_name with c1,c2, count(u) as q return c1.screen_name, c2.screen_name,q"
export default function Common() {
    //const location = useLocation();
    const [avg, setAvg] = useState(undefined);
    const [table, setTable] = useState(undefined);
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

    return (
        <div>
            <h3>El promedio de candidatos seguidos por los usuarios es {avg?avg:"..."}</h3>
            <div className="tableSection">
                <div>
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
                </div>
            </div>
        </div>
    )
}


