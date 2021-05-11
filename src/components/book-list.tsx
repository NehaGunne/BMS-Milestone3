import { Link } from "react-router-dom";
import StarRating from "./stars";
interface props{
        books:any
    }
const BookList=(props:props)=>{
    return(
        <div className='col-4 list-card text-center'>
            <Link to={`/book/${props.books._id}`}>
            <div>
                <img src={props.books.cover} className='list-img'/>
            </div>
            <div className='text-center'>
                <ul className='list-details'>
                    <li>Title: {props.books.title}</li>
                    <li>Author: {props.books.author}</li>
                    <li>Price: {props.books.price}</li>
                    <li>Rating: 
                    <StarRating rating={Math.round(props.books.rating)}/></li>
                </ul>
            </div>
            </Link>
        </div>
    )

}
export default BookList;