import {useSelector} from "react-redux";

//вторник 10:00 304 кабинет
//fixme сделать нормальный селектор, используя Redux
import {useEffect, useState} from "react";
import {Table} from "./simple-table";

export default function PointTable() {
    const [dataTable, setDataTable] = useState([]);

    const column = [
        {heading: 'x', value: 'x'}, {heading: 'y', value: 'y'}, {heading: 'r', value: 'r'},
        {heading: 'hit', value: 'hit'}, {heading: 'execTime', value: 'execTime'}, {heading: 'curTime', value: 'curTime'}
    ]

    useEffect(() => {
        fetch('http://localhost:8080/getpoints', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        }).then((data) => data.json())
          .then((data) => {
              setDataTable(data)})
    })



    return (
        <div className={"main__table"}>
            <Table data={dataTable} column={column}/>
        </div>
    )
}