import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

/*Modif: Page Profil */
const Profile=()=>{
    const auth = localStorage.getItem("user");
    const dateInscription = (JSON.parse(auth).createdAt).slice(0,10);
    const user = JSON.parse(localStorage.getItem("user"));
    const [total, setTotal] = useState(0);
    const [totalArticles, setTotalArticles] = useState();
    //const [userId, setUserId] = useState(user._id);
    const [carts, setCarts] = useState([]);

    const [names, setNames] = useState([]);
   
    useEffect(()=> {
        getCarts();
    }, [])
   

    const getCarts = async()=> {
        const userId = user._id;
        console.warn(userId);
        let result = await fetch(`https://uuu-3fwk.onrender.com/cart/${userId}`, {
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
            });
        result = await result.json();
        setCarts(carts.concat(result));
        setCarts(result);
        console.log(result);
        let interArticles = 0;
        let interTotal = 0;
        for(let i=0; i<result.length;i++){
            console.log(result[i].cart.length);
            interArticles += result[i].cart.length;
            interTotal += result[i].total;
        }
        setTotalArticles(interArticles);
        setTotal(interTotal);
        }


    return (
        <h1>Hello! {JSON.parse(auth).name} <br/>
        <p>Registered the {dateInscription}</p>
        <h2>Récapitulatif de vos commandes ({carts.length}):</h2>

        {
            carts.map((item)=> 
                <ul>{item.createdAt}
                <li>Total de la commande : {item.total}</li>
                <li>nombres d'articles : {item.cart.length}</li>
                <ul>Liste des articles : {item.cart.map((item)=> 
                <li> {item.name}</li>
                )}</ul>
                </ul>
            )
        }
        <p>nombre d'articles total :{totalArticles}</p>
        <p>volume d'achat total :{total}</p>
        </h1>
        
    )
}

export default Profile;