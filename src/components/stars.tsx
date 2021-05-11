import {FaStar} from 'react-icons/fa';
interface props{
    rating:any
}
const StarRating=(props:props)=>{
    return(
        <span>
            {[...Array(props.rating)].map(()=>
            <FaStar color='gold'/>
            )}
        </span>
    )
}
export default StarRating;