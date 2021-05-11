import { Link } from "react-router-dom";

interface props{
    books:any
}
const Table=(props:props)=>{
    return (
        <table>
                <thead>
                    <tr>
                        <th>cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Rating</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                    {props.books[0].map((each:any)=>
                        (<tr>
                            <Link to={`/book/${each.id}`}>
                            <td>
                                <img className='table-img' src={each.cover}/>
                            </td>
                            <td>{each.title}</td>
                            <td>{each.author}</td>
                            <td>{each.rating}</td>
                            <td>{each.price}</td>
                        </Link>
                        </tr>)
                    )}
                </tbody>
            </table>

    )
}
export default Table;