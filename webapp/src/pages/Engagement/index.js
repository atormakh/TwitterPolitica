
import { useEffect, useState } from "react"
import { Table, TableHead, TableCell, TableRow, TableBody, CircularProgress, Select, MenuItem } from "@mui/material"
const options = ["likes", "retweets", "replies", "quotes"]

const url = "http://localhost:8000/engagement"

export default function Engagement() {
    const [table, setTable] = useState(undefined);
    const [response, setResponse] = useState(undefined);
    const [option, setOption] = useState(options[0])
    const load = async () => {
        let response = await fetch(url);
        setResponse(await response.json())
    }
    useEffect(() => {
        load();
    }, [])

    useEffect(() => {
        if (response) {
            let arr = response.map(entry => {
                let row = {}
                row.c = entry._id;
                row.total = entry[option]
                row.avg = parseFloat(entry[option + "AVG"]).toFixed(2)
                row.favg = entry[option + "FAVG"]
                return row;
            })
            let max = Math.max.apply(null,arr.map(row => row.favg))
            arr = arr.map(row => {
                row.favg = row.favg/max
                return row
            })

            arr = arr.sort((a,b) => b.favg - a.favg)

            setTable(arr)
        }
    }, [option, response])

    return (
        <div>
            <Select
                id="optionSelect"
                value={option}
                onChange={v => setOption(v.target.value)}
            >
                {options.map(option => {
                    return (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    )
                })}
            </Select>
            <h3>Filas ordenadas por la columna <u>Promedio por Tweet/#seguidores</u></h3>
            <p>Dicha columna esta normalizada</p>
            <div className="tableSection">
                <div>
                    {table ? <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Candidato</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Promedio por Tweet</TableCell>
                                <TableCell>Promedio por Tweet/#seguidores</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.c}</TableCell>
                                    <TableCell>{row.total}</TableCell>
                                    <TableCell>{row.avg}</TableCell>
                                    <TableCell>{row.favg}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> : <CircularProgress />}
                </div>
            </div>
        </div>
    )
}


