import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router";
import StarRating from "./stars";

interface details{
        id:any,
    }
interface props{
    isAuth:boolean,
    token:any
}
const Description=(props:props)=>{
    const {id}:details=useParams();
    const history=useHistory();
    let [book,setBooks]:any=useState(null);
    useEffect(()=>{
        let url="http://localhost:8000/books/"+id;
        fetch(url)
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                    setBooks(data)
            })
            .catch(err=>{
                console.log(err.msg);
            })
        })

    const handleDelete=()=>{
        let url='http://localhost:8000/books/'+id;
        fetch(url,{
            method:'delete',
            headers:{
                'authorization':`Bearer ${props.token}`
            }
        }).then((data)=>{
            console.log(data);
            
            if(data.status===201){
                console.log('book deleted')
                history.push('/');
            }else{
                console.log('unauthorized');
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    return(
        <div className='d-flex flex-row justify-content-center'>
       {book &&  <div className='desc-card'>
            <div className='d-flex flex-row'>
                <div>
                    <img className='desc-img' src={book.cover}/>
                </div>
                <div className='details-card'>
                    <h1>{book.title}</h1>
                    <p>Author:{book.author}</p>
                    <p>Price:{book.price}
                    <span className="ml-3">Rating:<StarRating rating={Math.round(book.rating)}/></span></p>
                </div>
            </div>
            <div className='p-3 m-2'>
                <p>{book.description}</p>
            </div>
          {props.isAuth &&  <div className='d-flex flex-row justify-content-center'>
                <button onClick={handleDelete} className='btn btn-secondary'>Delete</button>
            </div>}
        </div>}
        </div>
    )
}
export default Description;