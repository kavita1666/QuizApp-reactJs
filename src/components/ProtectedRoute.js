import React from 'react'
import auth from "./Auth"
import {Route ,Redirect} from "react-router-dom"
const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest}
        render={props=>{
            if(auth.isAuthenticated())
            {
                return <Component {...props}/>
            }
            else{
                return <Redirect to={
                    {
                        pathname:"/",
                        state:{
                            from:props.location
                        }
                    }
                }/>
            }
        }}
        />
    )
}

export default ProtectedRoute