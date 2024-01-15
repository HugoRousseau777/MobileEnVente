import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SignUp=()=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [error, setError] = React.useState(false);
    const [doubleName, setDoubleName] = React.useState(false);
    const [doubleEmail, setDoubleEmail] = React.useState(false);
    const [emailProposition, setEmailProposition] = React.useState('');
    const [nameProposition, setNameProposition] = React.useState('');


    const navigate = useNavigate();
    useEffect(()=> {

        const auth = localStorage.getItem('user');  
        if(auth){
            navigate('/');
        }
    }, [])
    
    const collectData=async()=> {        
            let result = await fetch("https://uuu-3fwk.onrender.com/register", { /*Remplacement du localhost pour connecter le BA au FE  */
            method:'post',
            body:JSON.stringify({name, email, password, confirmPassword}),
            headers:{
                'Content-Type':'application/json'
            }
        });
            result= await result.json();  
            if(!name || !email || !password || !confirmPassword){
                setError(true);
                return false;
            }
            if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem('token', JSON.stringify(result.auth));
            localStorage.setItem('cart', JSON.stringify([])); // Ajout panier
            navigate("/");
            }
            if(result.doubleName){
                setDoubleName(true);
                setNameProposition(result.doubleName.name + "2");
            }
            if(result.doubleEmail){
                setDoubleEmail(true);
                setEmailProposition(result.doubleEmail.email + "2");
            }
        
    };
       
    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
            value={name} onChange={(e)=>setName(e.target.value)}
            />
            {error && !name && <span className='invalid-input-register'>Choose a name !</span>}
            {doubleName && <span className='invalid-input-register'>Already taken ! Here is a suggestion for you : {nameProposition}</span>}
            <input className="inputBox" type="text" placeholder="Enter email"
            value={email} onChange={(e)=>setEmail(e.target.value)}
            />
            {error && !email && <span className='invalid-input-register'>Choose an email !</span>}
            {doubleEmail && <span className='invalid-input-register'>Already taken ! Here is a suggestion for you : {emailProposition}</span>}
            <input className="inputBox" type="password" placeholder="Enter Password"
            value = {password} onChange={(e)=>setPassword(e.target.value)}
            />
            {error && !password && <span className='invalid-input-register'>Choose a password</span>}
            <input className="inputBox" type="password" placeholder="confirm Password"
            value = {confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            {error && !confirmPassword && <span className='invalid-input-register'>Confirm your password</span>}
            <button onClick={collectData} className="appButton" type="button">Sign up</button>
        </div>
    )
}

export default SignUp;