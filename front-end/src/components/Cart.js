import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

       
const Cart=()=> {
    
    const [cart, setCart]= useState([JSON.parse(localStorage.getItem("cart"))]);
    const [total, setTotal]= useState(0);
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    //const [total, setTotal]= useState("");

    useEffect(()=> { /*Permet d'activer la function à chaque clic sur le boutton*/ 
        getCart();
        
    }, [])
    
    useEffect(()=> { 
        getTotal();
    }, [])

    const getCart =  ()=> {
    setCart(JSON.parse(localStorage.getItem("cart")));
    console.warn('bouh!');
    }

    const validatePurchase = async()=>{
        let result = await fetch("http://localhost:5000/cart", {
            method:'post',
            body:JSON.stringify({cart, userId, total}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.warn("done!");
        setCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
        
        setTotal(0);
    }


    const getTotal = ()=> {
        let totalounet = 0;
        setProducts([]);
        for(let i=0; i<cart[0].length;i++){ // ??? cart[] ???
           setProducts(products.push(cart[0][i].price)) ;
            //setTotal(total + cart[0][i].price);
        }
        if(products.length > 0){
            totalounet = products.reduce((accumulator, currentValue) => accumulator + currentValue, totalounet);
        }
        //Ça et en-dessous : Solution pour avoir le total du panier => MAJ lors de la suppression ?
       setTotal(totalounet);
       setProducts(products.length=0); // Sinon ça compte le panier en double
       totalounet = 0;
    }
       
    const deleteFromCart = (indexOfArticle)=> {
        setTotal(total - cart[indexOfArticle].price) // Il suffisait de faire ça pour le prix total au lieu de Rappeler tout le total
        cart.splice(indexOfArticle, 1);
        localStorage.setItem("cart",JSON.stringify(cart));
        getCart(); // Permet de retirer de la page sans avoir à recharger 
    };

    //console.warn(cart[0]);
    return(<div>
        
        <div className="cart">
        <h1>Your cart</h1>
            <div className="articles">
            {
                cart.map((item, index)=> 
                    <ul className="article"key={index}>
                    <li className="name">{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.condition}</li>
                    <li>{item.company}</li>
                    <li>
                        <button onClick={(e)=>{deleteFromCart(index)}}>Delete</button>
                        </li>
                </ul>
                )
                
            }
            <p>Total : {total} €</p>
            <button className="command" onClick={validatePurchase}>Commander</button>
            </div>
            
           
       
    </div>
    </div>
    )
}

export default Cart;

/*Si le panier est vide, la page s'affiche mal ! */