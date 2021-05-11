import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
let user:any={
    email:'',
    password:'',
}
 interface props{
    login:Function
} 

const Login=(props:props)=>{
    const history=useHistory();
    let [errEmail,setEmail]=useState(null);
    let [errPassword,setPassword]=useState(null);
    function handleChange(e:any){
        let key=e.target.name;
        let val=e.target.value;
        user[key]=val;

    }
    async function getUser(){
        let url="http://localhost:8000/users/login";
        try{
            let res=await fetch(url,{
                method:'post',
                credentials:'include',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(user)
            });
            const data=await res.json();
            if(data.errors){
                setEmail(data.errors.email)
                setPassword(data.errors.password)
            }
            if(data.user){
                console.log(data);
                props.login(data.token)
                history.push('/')
            }
        }
        catch(err){
            console.log(err);
        }
       }
    return(
        <div className='d-flex flex-row justify-content-center mt-5'>
            <div className='login-card'>
                <h1 className='m-4'>Log in</h1>
                <div className='d-flex flex-row justify-content-center m-3'>
                    <div>
                        <div>
                            <label htmlFor='email'>Enter email:</label>
                            <input name='email' onChange={handleChange} id='email' className='form-control input'/>
                            <p className='err-msg'>{errEmail}</p>
                        </div>
                    <div>
                        <label htmlFor='password'>Enter password:</label>
                        <input type='password' name='password' onChange={handleChange} id='password' className='form-control input'/>
                        <p className='err-msg'>{errPassword}</p>
                    </div>
                    <div className='d-flex flex-row justify-content-center'>
                        <button onClick={getUser} className='btn btn-secondary'>Sign in</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}

export default Login
