export const Table = ({data, column}) => {
    return (
        <table>
            <thead>
                <tr>
                    {column.map((item, index) => <TableHead item={item}/>)}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => <TableRow item={item} column={column}/>)}
            </tbody>
        </table>
    )
}

const TableHead = ({item }) => <th>{item.heading}</th>
const TableRow = ({item, column}) => (

    <tr>
        {column.map((columnItem, index) => {
            return <td>{item[`${columnItem.value}`]}</td>
        })}
    </tr>
)
