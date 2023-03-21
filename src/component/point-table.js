

import {useEffect, useState} from "react";
import '../style/point-table.css'

export default function PointTable() {
    const [dataTable, setDataTable] = useState([]);

    const column = [
        {heading: 'x', value: 'x'}, {heading: 'y', value: 'y'}, {heading: 'r', value: 'r'},
        {heading: 'hit', value: 'hit'}, {heading: 'execTime', value: 'execTime'}, {heading: 'curTime', value: 'curTime'}
    ]

    useEffect(() => {
        setInterval(getPoints, 2000);
    })

    const getPoints = () => {
        fetch('http://localhost:8080/getpoints', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        }).then((data) => data.json())
            .then((data) => {
                setDataTable(data)})
    }

    return (
        <div>
            <table className={"hit__table"}>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>HIT</th>
                    <th>EXEC-TIME</th>
                    <th>CUR-TIME</th>
                </tr>
                {dataTable.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.x}</td>
                            <td>{val.y}</td>
                            <td>{val.r}</td>
                            <td>{val.hit}</td>
                            <td>{val.execTime}</td>
                            <td>{val.curTime}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}