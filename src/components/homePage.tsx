import React, { useEffect, useState } from 'react';
import BookListCont from './booklist-cont';

let value='',name='id',min=0,max=200;
const Home=()=>{
    let [books,setBooks]=useState(null);
    let [priceStyle,setPriceStyle]=useState({display:'none'})
    let [styleAll,setAllStyle]=useState({display:'block'})
    useEffect(()=>{
        let url="http://localhost:8000/books";
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
        },[])
        async function searchByAuthor() {
            let res=await fetch('http://localhost:8000/books/by/'+value)
            let data=await res.json()
            setBooks(data)
            //console.log(await res.json())
            
        }
        async function searchById() {
            let res=await fetch('http://localhost:8000/books/'+value)
            let data=await res.json()
            setBooks(data)
            
        }
        async function searchByTitle() {
            let res=await fetch('http://localhost:8000/books/?title='+value)
            let data=await res.json()
            setBooks(data)
            //console.log(await res.json())
            
        }
        async function searchByRating() {
            let res=await fetch('http://localhost:8000/books/books-with-min-rating/'+value)
            let data=await res.json()
            setBooks(data)
            //console.log(await res.json())
            
        }
        async function searchByText() {
            let res=await fetch('http://localhost:8000/books/text/matching/?q='+value)
            let data=await res.json()
            setBooks(data)
            //console.log(await res.json())
            
        }
        async function searchByPrice() {
            let res=await fetch('http://localhost:8000/books/price/'+min+'/'+max);
            let data=await res.json()
            setBooks(data)
            //console.log(await res.json())
            
        }
        function getName(e:any){
            name=e.target.value;
            if(name==='price'){
                setPriceStyle({display:'block'})
                setAllStyle({display:'none'})
            }else{
                setPriceStyle({display:'none'})
                setAllStyle({display:'block'})

            }

        }
        function getValue(e:any){
            value=e.target.value;
        }
        function getMinMax(e:any){
            value=e.target.value.split('-');
            min=parseInt(value[0]);
            max=parseInt(value[1]);
            console.log(min,max)

        }
    async function searchBooks(e:any){
        console.log(name);
        
        if(name==='id'){
            searchById();
        }
        else if(name==='author'){
            searchByAuthor();
        }
        else if(name==='title'){
            searchByTitle();
        }
        else if(name==='rating'){
            searchByRating();
        }
        else if(name==='text'){
            searchByText();
        }
        else if(name==='price'){
            searchByPrice();
        }
    }
    return(
        <div>
            <div className='d-flex flex-row justify-content-center'>
                <select onChange={getName} className='form-control input'>
                    <option value='id'>Search by id</option>
                    <option value='title'>Search by title</option>
                    <option value='author'>Search by author</option>
                    <option value='rating'>Search by rating</option>
                    <option value='text'>Search by text</option>
                    <option value='price'>Search by price</option>
                </select>
                <input style={styleAll} className='form-control input' placeholder='Search here' onChange={getValue}/>
                <select style={priceStyle} onChange={getMinMax} className='form-control input'>
                    <option value='0-200'>below 200</option>
                    <option>200-300</option>
                    <option>300-400</option>
                    <option>400-500</option>
                    <option value='0-500'>below 500</option>
                    <option value='500-1000'>above 500</option>
                </select>
                <button onClick={searchBooks} className='btn btn-secondary m-2'>Search</button>
            </div>
            <div className='d-flex flex-row justify-content-center'>
               {books && <BookListCont books={books}/>}
            </div>
        </div>
    )
}

export default Home;