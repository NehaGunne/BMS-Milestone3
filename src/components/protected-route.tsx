import {useEffect,useState} from 'react';
import {Route,Redirect} from 'react-router-dom';
interface Routeprops{
    component:React.FC,
    path:any,
    isAuth:boolean,
    token:any
}
const ProtectedRoute:React.FC<Routeprops>=({isAuth:isAuth,component:Component,...rest})=>{
    return(
        <Route {...rest} render={(props)=>{
            if(isAuth){
                return <Component {...rest}/>
            }else{
                return <Redirect to={{pathname:'/login',state:{from:props.location}}}/>
            }
        }}/>
    )
}
export default ProtectedRoute;