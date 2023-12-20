import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SignUp=()=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=> {

        const auth = localStorage.getItem('user');  
        if(auth){
            navigate('/');
        }
    }, [])
    
    const collectData=async()=> {
        console.warn(name,email,password);
        let result = await fetch("https://uuu-3fwk.onrender.com/register", {
            method:'post',
            body:JSON.stringify({name,email,password, confirmPassword}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result= await result.json();  
        console.log(result);
        if(result.auth){
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        localStorage.setItem('cart', JSON.stringify([])); // Ajout panier
        navigate("/");
        }
        
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
            value={name} onChange={(e)=>setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter email"
            value={email} onChange={(e)=>setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter Password"
            value = {password} onChange={(e)=>setPassword(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="confirm Password"
            value = {confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <button onClick={collectData} className="appButton" type="button">Sign up</button>
        </div>
    )
}

export default SignUp;