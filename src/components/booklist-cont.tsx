import BookList from "./book-list";
interface props{
    books:any
}
const BookListCont=(props:props)=>{
    return(
        <div className='container'>
            <div className='row'>
            {props.books && props.books.map((each:any)=><BookList books={each}/>)}
            </div>
        </div>
    )
}
export default BookListCont;