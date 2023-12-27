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
        let result = await fetch(`http://localhost:5000/cart/${userId}`, {
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
        <>
        <h1>Bienvenue {JSON.parse(auth).name} !</h1>
        <p id="registrationDate">Registered the {dateInscription}</p>
        
        <div className="containerPurchases">
        <h2>Récapitulatif de vos commandes ({carts.length}):</h2>
        {
            carts.map((item)=> 
                <ul className="commande">
                    <li className="dateCommande">{item.createdAt}</li>
                    <li>Total de la commande : {item.total} €</li>
                    <li>nombres d'articles : {item.cart.length}</li>
                    <li className="listeArticles">
                        <ul>Liste des articles : {item.cart.map((item)=> 
                        <li> {item.name}</li>)}
                        </ul>
                    </li>
                </ul>
            )
        }
        <p className="totauxTotaux">Nombre d'articles total :{totalArticles}</p>
        <p className="totauxTotaux">Volume d'achat total :{total}</p>
        </div>
        </>
    )
}

export default Profile;