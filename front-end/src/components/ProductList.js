import React, {useEffect, useState} from 'react';
import {json, Link} from 'react-router-dom';

const ProductList=()=>{

    const [products, setProducts]= useState([]); // Should be used in getProducts
    const [allProducts, setAllProducts] = useState([]);
    const [productsInterPrix, setProductsInterPrix] = useState([]);
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
        let result = await fetch('https://uuu-3fwk.onrender.com/products', {
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
    //
    setCountGood(false);
    setCountOk(false);
    setCountBad(false);
    setCountPerfect(true);
    conditionButtons[1].classList.remove("selected");
    conditionButtons[2].classList.remove("selected");
    conditionButtons[3].classList.remove("selected");
    conditionButtons[0].classList.add("selected");
    //

    let interM = []; // Initialiser l'array vide puis le remplir comme ça permet de ne pas faire appel aux mêmes cases mémoires et changer productsInter à chaque fois

    if(priceMore > 0){
            // En récupérant directement tous les produits puis en effectuant un filtre d'array sur le prix désiré, c'est plus pratique.
        let triadou = allProducts.filter((product) => product.price > priceMore);
        for(let i=0; i<triadou.length;i++)
        interM.push(triadou[i]);
    } else {
        for(let i=0; i<allProducts.length;i++){
            interM.push(allProducts[i]);
        }
    }
    //
    if (countPerfect == true){
       setCountPerfect(false);
       conditionButtons[0].classList.remove("selected");
    } else {
        for(let i=0; i<interM.length;i++){
            if (interM[i].condition == "Bad" || interM[i].condition == "Good" || interM[i].condition == "Ok"){
             delete interM[i];
            }
        }
        //setProductsInterCondition(interM);
      }
    interM = interM.filter((a)=> a); // Permet d'enlever les "empty" créés par delete productsInter[i]
    setProducts(interM);
    setProductsInterCondition(interM);
    setCountPerfect(!countPerfect);
   }

    const getGood = async() => {
        //
        setCountPerfect(false);
        setCountOk(false);
        setCountBad(false);
        conditionButtons[0].classList.remove("selected");
        conditionButtons[1].classList.add("selected");
        conditionButtons[2].classList.remove("selected");
        conditionButtons[3].classList.remove("selected");

        let interM = [];
        if(priceMore > 0){
            // En récupérant directement tous les produits puis en effectuant un filtre d'array sur le prix désiré, c'est plus pratique.
        let triadou = allProducts.filter((product) => product.price > priceMore);
        for(let i=0; i<triadou.length;i++)
        interM.push(triadou[i]);
    } else {
        for(let i=0; i<allProducts.length;i++){
            interM.push(allProducts[i]);
        }
    }
        //
    if (countGood == true){ 
        setCountGood(false);
        setCountPerfect(false);
        conditionButtons[1].classList.remove("selected");
    }
    else if (countGood == true && countPerfect == true) {
        setCountPerfect(false);
        setCountGood(false);
    } 
    else {
            setCountGood(!countGood);
            for(let i=0; i<interM.length;i++){
                if (interM[i].condition == "Bad" || interM[i].condition == "Ok"){
                delete interM[i];
                }
            }
            interM = interM.filter((a)=> a);
    }
    setProducts(interM);
    setProductsInterCondition(interM);
        }

    const getOk = async() => {
        setCountPerfect(false);
        setCountGood(false);
        setCountBad(false);
        conditionButtons[0].classList.remove("selected");
        conditionButtons[1].classList.remove("selected");
        conditionButtons[2].classList.add("selected");
        conditionButtons[3].classList.remove("selected");

        let interM = [];
        if(priceMore > 0){
        let triadou = allProducts.filter((product) => product.price > priceMore);
        for(let i=0; i<triadou.length;i++)
        interM.push(triadou[i]);
    } else {
        for(let i=0; i<allProducts.length;i++){
            interM.push(allProducts[i]);
        }
    }

        if (countOk == true){
            setProducts(allProducts);
            setCountOk(!countOk);
            conditionButtons[2].classList.remove("selected");
        }   else {
                setCountOk(!countOk);
                for(let i=0; i<interM.length;i++){
                    if (interM[i].condition == "Bad"){
                        delete interM[i];
                    }
                }
                interM = interM.filter((a)=> a);
                setProductsInterCondition(interM);
            }
    setProducts(interM);
    }

    const getBad = async ()=>{
        conditionButtons[0].classList.remove("selected");
        conditionButtons[1].classList.remove("selected");
        conditionButtons[2].classList.remove("selected");
        conditionButtons[3].classList.add("selected");
        setCountPerfect(false);
        setCountGood(false);
        setCountOk(false);
        setCountBad(true);

        if(countBad == true) {
            setCountBad(false);
            conditionButtons[3].classList.remove("selected");
        }

        let interM = [];
        if(priceMore > 0){
            let triadou = allProducts.filter((product) => product.price > priceMore);
            for(let i=0; i<triadou.length;i++)
            interM.push(triadou[i]);
        } else {
            for(let i=0; i<allProducts.length;i++){
                interM.push(allProducts[i]);
            }
        }
        setProducts(interM);
    }

    const deleteProduct= async(id)=>{
        console.warn(id);
        let result = await fetch(`https://uuu-3fwk.onrender.com/${id}`, {
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
        let result = await fetch(`https://uuu-3fwk.onrender.com/${id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        cart.push(result);
        localStorage.setItem("cart",JSON.stringify(cart));
    }

    // Ajout tri function prix
    const getPriceMore = async(event)=>{
        let interM = [];
        // Prend l'arrayIntermédiaire condition si besoin
        if (countPerfect || countGood || countOk){
            for(let i=0; i<productsInterCondition.length; i++){
                interM.push(productsInterCondition[i]);
            }
        } else {
            for(let i=0; i<allProducts.length; i++)
            interM.push(allProducts[i]);
        }

        let key = event.target.value;
        if(key){
            // Retire de l'array en fonction du prix rentré
            setPriceMore(key);
            for(let i=0; i< interM.length;i++){
                if( interM[i].price < key){
                    delete interM[i];
                }
            }
            //
            interM = interM.filter((a)=> a); // Retire les cases vides de l'array
            setProductsInterPrix(interM)      
            } else {
                setPriceMore(0)
            }
        setProducts(interM); 
        console.log(interM);
        }

    const getPriceLess = async(event)=>{
        let interM = [];
        if (countPerfect || countGood || countOk){
            for(let i=0; i<productsInterCondition.length; i++){
                interM.push(productsInterCondition[i]);
            }
        } else {
            for(let i=0; i<allProducts.length; i++)
            interM.push(allProducts[i]);
        }
        let key = event.target.value;
        if(key){
            
            setPriceLess(key);
            for(let i=0; i< interM.length;i++){
                if( interM[i].price < key){
                    delete interM[i];
                }
            }
            //
            interM = interM.filter((a)=> a); // Retire les cases vides de l'array
            setProductsInterPrix(interM)      
            } else {
                setPriceLess(0)
            }
        setProducts(interM); 
    } 
//
    const searchHandle = async(event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`https://uuu-3fwk.onrender.com/${key}`, {
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
            <input type="number" className="search-product-box" onChange={getPriceMore} placeholder="More than ... €"/>
            <input type="number" className="search-product-box" onChange={getPriceLess} placeholder="Less than ... €"/>
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
                       <Link to={"/update/" + item._id}><a className="super-button">Update</a></Link>
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