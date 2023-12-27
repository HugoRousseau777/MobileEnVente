import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const ProductList=()=>{

    const [products, setProducts]= useState([]);
    
       let cart = JSON.parse(localStorage.getItem("cart"));
       let user = JSON.parse(localStorage.getItem("user"));
    
    

    useEffect(()=> {
        getProducts();
    }, [])

    const getProducts = async () => {
        let products = [];
        let result = await fetch('http://localhost:5000/products', {
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` // Only Change  
                //Viewable in Network -> products in Name column far down-left -> 
            }
        });
        result = await result.json();

  // Pour faire en sorte que l'utilisateur ne puisse pas voir ses propres produits
        for(let i=0; i<result.length;i++){
            if(result[i].userId !== user._id){
                products.push(result[i]);
            }
        }
        setProducts(products);
    }
    

    const deleteProduct= async(id)=>{
        console.warn(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method:"Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            alert("Product deleted");
            getProducts();
        } else {
            alert("Nothing happened !")
        }        
    }

    const addToCart= async(id)=> {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        cart.push(result);
        localStorage.setItem("cart",JSON.stringify(cart));
    }

    const searchHandle = async(event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
                
            });
            result = await result.json();
            if(result){
            setProducts(result);
        }
        } else {
            getProducts(); // Let if(key) else permet d'avoir une recherche quand la barre est remplie, puis d'avoir la liste complète quand l'utilisateur efface la barre de recherce
        }
        
    }
    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" className="search-product-box" placeholder="Search your product" onChange={searchHandle}/>
            <div className="products">
            {
               products.length>0 ? products.map((item, index)=> 
               <>
               <div className="product">
                   <div className="product-img"></div>
                    <ul key={item._id} >
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    </ul>
                    <div className="product-buttons">
                        <button className="super-button" onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                       <Link to={"/update/" + item._id}><a className="super-button">Update</a></Link>
                        <button className="super-button" onClick={()=>{addToCart(item._id)}}>Buy</button>
                    </div>
                </div>
                </>

                )
                : <h1>No result found</h1>
            }
            </div>
        </div>
    )
}

export default ProductList;