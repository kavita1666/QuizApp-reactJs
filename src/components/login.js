import React, { useState } from "react"
import {useHistory } from "react-router-dom"
import auth from "./Auth"
import "./login.css"

function Login(){

    let history=useHistory();

    const [userInput,setUserInput]=useState({
        name:"",
        email:"",
        password:"",
    })

    const [message,setMessage]=useState("");
    const [allEntry,setAllEntry]=useState([])

    const handleOnChange=(e)=>{
        const {name,value}=e.target;

        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault()
        const newEntry={name:userInput.name,email:userInput.email, password:userInput.password}
        setAllEntry([...allEntry,newEntry])

        if(newEntry.email==="kavita@gmail.com" && newEntry.name==="kavita" && newEntry.password==="kavita")
        {
            auth.authenticated=true
            history.push("/quiz")
        }
        else
        {
            setMessage("Unauthorised access!Please try again")
            history.push("/")
        }
    }

    return (
        <div >
            <form className="login" onSubmit={handleOnSubmit}>
                <h1>Login</h1>
                <div>{message}</div>
                <input required type="text" name="name" value={userInput.name} onChange={handleOnChange} placeholder="Enter Your Name" ></input>
                <input required type="email" name="email" value={userInput.email} onChange={handleOnChange}   placeholder="Enter Your Email id" ></input>
                <input required type="password" name="password" value={userInput.password} onChange={handleOnChange}   placeholder="Enter Your Password" ></input>
                <button className="button" >Login</button>
                <div>or</div>
                <button className="button" >Register</button>
            </form>
        </div>
    )
}

export default Login; 