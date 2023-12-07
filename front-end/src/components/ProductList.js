import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const ProductList=()=>{

    const [products, setProducts]= useState([]);

    useEffect(()=> {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` // Only Change  
                //Viewable in Network -> products in Name column far down-left -> 
            }
        });
        result = await result.json();
        setProducts(result);
        console.warn(result);
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
        } else {
            alert("Nothing happened !")
        }        
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
            <h3>Product List</h3>
            <input type="text" className="search-product-box" placeholder="Search your product" onChange={searchHandle}/>
            {
               products.length>0 ? products.map((item, index)=> 
                    <ul key={item}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li>
                        <button onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                        <Link to={"/update/" + item._id}>Update</Link> 
                        </li>
                </ul>
                )
                : <h1>No result found</h1>
            }
        </div>
    )
}

export default ProductList;