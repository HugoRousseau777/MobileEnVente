import React, {useEffect, useState} from 'react';
import {json, Link} from 'react-router-dom';

const ProductList=()=>{

    const [products, setProducts]= useState([]); // Should be used in getProducts
    const [allProducts, setAllProducts] = useState([]);
    const [productsInterPrix, setProductsInterPrix] = useState([]);
    const [productsInterPrixMoreThan, setProductsInterPrixMoreThan] = useState([]);
    const [productsInterPrixLessThan, setProductsInterPrixLessThan] = useState([]);
    const [productsInterCondition, setProductsInterCondition] = useState([]);
    const [productsCondition, setProductsCondition] = useState([]);
    const [condition, setCondition] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [priceMore, setPriceMore] = useState(0);
    const [priceLess, setPriceLess] = useState(0);


    // Ajustement pour la classe selected :

    const conditionButtons = Array.from(document.getElementsByClassName("conditionButton"));
    const [countPerfect, setCountPerfect] = useState(false);
    const [countGood, setCountGood] = useState(false);
    const [countOk, setCountOk] = useState(false);
    const [countBad, setCountBad] = useState(false);


    let cart = JSON.parse(localStorage.getItem("cart"));
    let user = JSON.parse(localStorage.getItem("user"));
    
    const path = 'front-end/public/images/';
    const imgs = ['aa.jpeg','dza.jpeg','téléchargement.jpeg'];
    
    let allRandom = []; // Array des n° d'images aléatoire ; Lgth= au nombre d'article
    for (let i =0; i<products.length; i++){
    let rand = Math.floor(Math.random()*imgs.length);
    allRandom.push(rand);
    }

    useEffect(()=> {
        getProducts();
    }, [])

    const getProducts = async () => {
        let interM = [];
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
                interM.push(result[i]);
            }
        }
        setAllProducts(interM);  
        setProducts(interM);  // Permet d'avoir un ensemble de produits sans faire d'appel à la BDD  
    }

// Changes for condition choice :

    const getPerfect = async() => {
        setCountGood(false);
        setCountOk(false);
        setCountBad(false);
        setCountPerfect(true);
    
    let inter = []; 
    //
    if (countPerfect == true && priceLess > 0 || priceMore > 0){
       setCountPerfect(false);
       setProducts(productsInterPrix);
    } else if (countPerfect == true){
        setCountPerfect(false);
        getProducts();
     } else {
        if(priceMore > 0|| priceLess > 0) {
            for (let i=0; i<productsInterPrix.length;i++){
                inter.push(productsInterPrix[i]);
            }
        for (let i=0; i<inter.length; i++){
            if (inter[i].condition == "Bad" || inter[i].condition == "Good" || inter[i].condition == "Ok") {
                delete inter[i];
            }
        }
        inter = inter.filter((a)=> a);
        } else {
            for(let i=0; i<allProducts.length;i++){
                if (allProducts[i].condition == "Perfect"){
                 inter.push(allProducts[i]);
                }
            }
        }


        
      }
    setProducts(inter);
    setProductsInterCondition(inter);
    setCountPerfect(!countPerfect);
    }

    const getGood = async() => {
        console.log("a");
    }
    const getOk = async() => {
        console.log("a");
    }
    const getBad = async() => {
        console.log("a");
    }

    const getMoreThan = async(event) => {
        let inter = [];
        let key = event.target.value;
        if(key){
            setPriceMore(key);
            for(let i=0; i<allProducts.length; i++){
                if(allProducts[i].price > key) {
                    inter.push(allProducts[i]);
                }
            }
            setProductsInterPrixMoreThan(inter); 
            if(priceLess > 0) {
                for(let i=0; i<inter.length; i++){
                    if(inter[i].price > priceLess){
                        delete inter[i];
                    }
                }
                inter = inter.filter((a)=> a);
            } 
            setProducts(inter);
            setProductsInterPrix(inter);
        } else {
            setPriceMore(0);
            if (priceLess > 0){
                setProducts(productsInterPrixLessThan); // Sans champs less et avec un champ more, on récupère le résultat de la function more
            } else {
                getProducts();
            }
        }
    }
    const getLessThan = async(event) => {
        let inter = [];
        let key = event.target.value;
        if(key){
            setPriceLess(key);
            for(let i=0; i<allProducts.length; i++){
                if(allProducts[i].price < key) {
                    inter.push(allProducts[i]);
                }
            }
            setProductsInterPrixLessThan(inter);
            if(priceMore > 0) {
                for(let i=0; i<inter.length; i++){
                    if(inter[i].price < priceMore){
                        delete inter[i];
                    }
                }
                inter = inter.filter((a)=> a);
            } 
            setProducts(inter);
            setProductsInterPrixLessThan(inter);
        } else {
            setPriceLess(0);
            if (priceMore > 0){
                setProducts(productsInterPrixMoreThan); // Sans champs less et avec un champ more, on récupère le résultat de la function more
            } else {
                getProducts();
            }
        }
    }
   

    const deleteProduct= async(id)=>{
        console.warn(id);
        let result = await fetch(`http/localhost:5000/${id}`, {
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
        let result = await fetch(`http/localhost:5000/${id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        cart.push(result);
        localStorage.setItem("cart",JSON.stringify(cart));
    }

    // Ajout tri function prix
  

    const searchHandle = async(event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/${key}`, {
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
/*
    const conditionButtons = document.getElementsByClassName("conditionButton");
        Array.from(conditionButtons)[0].addEventListener("click", ()=> {
            if (countPerfect = true){

            }
        })*/
    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" className="search-product-box" placeholder="Search your product" onChange={searchHandle}/>
            <input type="number" className="search-product-box" onChange={getMoreThan}  placeholder="More than ... €"/>
            <input type="number" className="search-product-box" onChange={getLessThan}  placeholder="Less than ... €"/>
            <p>Choose which state is acceptable for you :</p>
            <div className="condition containerCondBut">
            <button className="conditionButton" onClick={()=> {
                    getPerfect();
                    }}>Perfect</button> 
                <button className="conditionButton" onClick={()=>{
                     getGood();
                    }}>Good</button> 
                <button className="conditionButton" onClick={()=>getOk()}>Ok</button> 
                <button className="conditionButton" onClick={()=>getBad()}>Bad</button> 
            </div>
            <div className="products">
            {
               products.length>0 ? products.map((item, index)=> 
               <>
               
               <div className="product">
                   <div className="product-img">
                       <img className="img-aleat" src={`/images/${imgs[allRandom[index]]}`}/>
                   </div>
                    <ul key={item._id} >
                    <li>{item.name}</li>
                    <li>{item.price} €</li>
                    <li>{item.condition}</li>
                    <li>{item.company}</li>
                    </ul>
                    <div className="product-buttons">
                        <button className="super-button" onClick={()=>{addToCart(item._id);
                                                                        deleteProduct(item._id)
                        }}>Buy</button>
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