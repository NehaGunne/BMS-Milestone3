import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
 interface props{
    isAuth:boolean,
    logout:Function
} 
const Navbar=(props:props)=>{
    console.log('nav',props.isAuth);
    
    const history=useHistory();
    async function logOut() {
        try{
            let res=await fetch('http://localhost:8000/users/logout',{
                credentials:'include'
            });
            console.log(res);
            props.logout();
            history.push('/')
            window.location.reload();

        }catch(err){
            console.log(err);
            
        }
        
    }
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light nav-bg">
            <a className="navbar-brand nav-text" href="#">Book Management System</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                <Link className="nav-item nav-text nav-link active" to="/"
                >Home <span className="sr-only">(current)</span></Link>
                <Link className="nav-item nav-link nav-text"
                 to="/add-book">Add Books</Link>
               {!props.isAuth && <Link className="nav-item nav-link nav-text" 
                to="/login">Login</Link>}
               {!props.isAuth && <Link className="nav-item nav-link nav-text"
                 to="/signup">Signup</Link>}
                {props.isAuth && <Link className="nav-item nav-link nav-text" to='#'
                 onClick={logOut}>log out</Link>}
                </div>
            </div>
        </nav>
    )
}
export default Navbar;