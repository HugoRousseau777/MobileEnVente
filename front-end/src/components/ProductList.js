import React, {useEffect, useState} from 'react';
import {json, Link} from 'react-router-dom';

const ProductList=()=>{

    const [products, setProducts]= useState([]); // Should be used in getProducts
    const [allProducts, setAllProducts] = useState([]);
    const [productsInterPrix, setProductsInterPrix] = useState([]);
    const [productsInterPrixMoreThan, setProductsInterPrixMoreThan] = useState([]);
    const [productsInterPrixLessThan, setProductsInterPrixLessThan] = useState([]);
    const [productsInterCondition, setProductsInterCondition] = useState([]);
    const [productsInterQR, setProductsInterQR] = useState([]);
    const [productsInterQP, setProductsInterQP] = useState([]);
    const [productsInterRP, setProductsInterRP] = useState([]);
    const [productsInterQPR, setProductsInterQPR] = useState([]);
    const [productsFromSearch, setProductsFromSearch] = useState([]);
    const [productsCondition, setProductsCondition] = useState([]);
    const [condition, setCondition] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [priceMore, setPriceMore] = useState(0);
    const [priceLess, setPriceLess] = useState(0);
    const [search, setSearch] = useState("");


    // Ajustement pour la classe selected :

    const conditionButtons = Array.from(document.getElementsByClassName("conditionButton"));
    const [countPerfect, setCountPerfect] = useState(false);
    const [countGood, setCountGood] = useState(false);
    const [countOk, setCountOk] = useState(false);
    const [countBad, setCountBad] = useState(false);
    const [count, setCount] = useState(0);

    conditionButtons.forEach((condButton)=> {
        condButton.addEventListener("click", ()=> {
            setCount(count + 1);
            if (count % 2 != 0){
                condButton.classList.remove("selected");
            } else {
                condButton.classList.add("selected");
            }
            
        })
    })

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
        const regex = new RegExp(`${search}`);
        setCountGood(false);
        setCountOk(false);
        setCountBad(false);
        let inter = []; 

        for(let i=0; i<allProducts.length; i++){ // Gets all products
           inter.push(allProducts[i]);
        }
        if (countPerfect == false) { // Deletes non-perfect
            for (let i=0; i<inter.length; i++){ 
                if(inter[i].condition == "Good" || inter[i].condition == "Ok" || inter[i].condition == "Bad"){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
            setProductsInterCondition(inter);
        }
        if (search.length >0) { // if search is used => Deletes non-search adequate
            for(let i=0; i<inter.length; i++){ 
                if(!regex.test(inter[i].name)) {
                    delete inter[i];
                }
        }
            inter = inter.filter((a)=> a);
        }
        if (priceLess > 0) { 
            for (let i=0; i<inter.length; i++){
                if(inter[i].price > priceLess){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        if (priceMore > 0) { 
            for (let i=0; i<inter.length; i++){
                if(inter[i].price < priceMore){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        setProducts(inter);
        setCountPerfect(!countPerfect);
    }

    const getGood = async() => {
        const regex = new RegExp(`${search}`);
        setCountGood(false);
        setCountOk(false);
        setCountBad(false);
        let inter = []; 

        for(let i=0; i<allProducts.length; i++){ // Gets all products
           inter.push(allProducts[i]);
        }
        if (countGood == false) { // Deletes non-perfect
            for (let i=0; i<inter.length; i++){ 
                if(inter[i].condition == "Ok" || inter[i].condition == "Bad"){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        if (search.length >0) { // if search is used => Deletes non-search adequate
            for(let i=0; i<inter.length; i++){ 
                if(!regex.test(inter[i].name)) {
                    delete inter[i];
                }
        }
            inter = inter.filter((a)=> a);
        }
        if (priceLess > 0) { 
            for (let i=0; i<inter.length; i++){
                if(inter[i].price > priceLess){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        if (priceMore > 0) { 
            for (let i=0; i<inter.length; i++){
                if(inter[i].price < priceMore){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        setProducts(inter);
        setCountGood(!countGood);
    }

    const getOk = async() => {
        const regex = new RegExp(`${search}`);
        setCountGood(false);
        setCountOk(false);
        setCountBad(false);
        let inter = []; 

        for(let i=0; i<allProducts.length; i++){ // Gets all products
           inter.push(allProducts[i]);
        }
        if (countOk == false) { // Deletes non-perfect
            for (let i=0; i<inter.length; i++){ 
                if(inter[i].condition == "Bad"){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        if (search.length >0) { // if search is used => Deletes non-search adequate
            for(let i=0; i<inter.length; i++){ 
                if(!regex.test(inter[i].name)) {
                    delete inter[i];
                }
        }
            inter = inter.filter((a)=> a);
        }
        if (priceLess > 0) { 
            for (let i=0; i<inter.length; i++){
                if(inter[i].price > priceLess){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        if (priceMore > 0) { 
            for (let i=0; i<inter.length; i++){
                if(inter[i].price < priceMore){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        setProducts(inter);
        setCountGood(!countGood);
    }

    const getBad = async() => {
        const regex = new RegExp(`${search}`);
        setCountGood(false);
        setCountOk(false);
        setCountBad(false);
        let inter = []; 

        for(let i=0; i<allProducts.length; i++){ // Gets all products
           inter.push(allProducts[i]);
        }
        if (search.length >0) { // if search is used => Deletes non-search adequate
            for(let i=0; i<inter.length; i++){ 
                if(!regex.test(inter[i].name)) {
                    delete inter[i];
                }
        }
            inter = inter.filter((a)=> a);
        }
        if (priceLess > 0) { 
            for (let i=0; i<inter.length; i++){
                if(inter[i].price > priceLess){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        if (priceMore > 0) { 
            for (let i=0; i<inter.length; i++){
                if(inter[i].price < priceMore){
                    delete inter[i]
                }
            }
            inter = inter.filter((a)=> a);
        }
        setProducts(inter);
        setCountBad(!countBad);
    }

    const getMoreThan = async(event) => {
        const regex = new RegExp(`${search}`);
        let inter = [];
        let key = event.target.value;
        if(countPerfect == true || countGood == true || countOk == true || countBad == true) { // On récupère chaque array différent selon la condition activée puis trie selon le prix, Sinon, tous les produits
            let len = productsInterCondition.length; //!!! Pourquoi l'arrayFilter plus haut n'a pas marché ?!!!
            for(let i = 0; i < len; i++ ) {
                productsInterCondition[i] && productsInterCondition.push(productsInterCondition[i]);  // copy non-empty values to the end of the array
            }
            productsInterCondition.splice(0 , len);  // cut the array and leave only the non-empty values
            for(let i=0; i<productsInterCondition.length; i++){
                if(productsInterCondition[i].price > key) {
                    inter.push(productsInterCondition[i]);
                }
            }
        } else {
            for(let i=0; i<allProducts.length; i++){
                    inter.push(allProducts[i]);
            }
        }
        if (search.length >0) { // if search is used => Deletes non-search adequate
            for(let i=0; i<inter.length; i++){ 
                if(!regex.test(inter[i].name)) {
                    delete inter[i];
                }
            }
            inter = inter.filter((a)=> a);
        }  
        if(priceLess > 0) {
            for(let i=0; i<inter.length; i++){
                if(inter[i].price > priceLess){
                    delete inter[i];
                }
            }
            inter = inter.filter((a)=> a);
        }
        if(key){
            setPriceMore(key);
            for(let i=0; i<inter.length; i++){
                if(inter[i].price < key){
                    delete inter[i];
                }
            }
            inter = inter.filter((a)=> a);
        } else {
            setPriceMore(0);
        }
        setProducts(inter);
    }

    const getLessThan = async(event) => {
        const regex = new RegExp(`${search}`);
        let inter = [];
        let key = event.target.value;
        if(countPerfect == true || countGood == true || countOk == true || countBad == true) { // On récupère chaque array différent selon la condition activée puis trie selon le prix, Sinon, tous les produits
            let len = productsInterCondition.length; //!!! Pourquoi l'arrayFilter plus haut n'a pas marché ?!!!
            for(let i = 0; i < len; i++ ) {
                productsInterCondition[i] && productsInterCondition.push(productsInterCondition[i]);  // copy non-empty values to the end of the array
            }
            productsInterCondition.splice(0 , len);  // cut the array and leave only the non-empty values
            for(let i=0; i<productsInterCondition.length; i++){
                    inter.push(productsInterCondition[i]);
            }
        } else {
            for(let i=0; i<allProducts.length; i++){
                    inter.push(allProducts[i]);
            }
        }
        if (search.length >0) { // if search is used => Deletes non-search adequate
            for(let i=0; i<inter.length; i++){ 
                if(!regex.test(inter[i].name)) {
                    delete inter[i];
                }
            }
            inter = inter.filter((a)=> a);
        }  
        if(priceMore > 0) {
            for(let i=0; i<inter.length; i++){
                if(inter[i].price < priceMore){
                    delete inter[i];
                }
            }
            inter = inter.filter((a)=> a);
        }
        if(key){
            setPriceLess(key);
            for(let i=0; i<inter.length; i++){
                if(inter[i].price > key){
                    delete inter[i];
                }
            }
            inter = inter.filter((a)=> a);
        } else {
            setPriceLess(0);
        }
        setProducts(inter);
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
        alert("Product added to cart !");
    }
  
    const searchHandle = async(event)=>{
        let inter = [];
        let key = event.target.value;
        if(countPerfect == true || countGood == true || countOk == true || countBad == true) { 
            let len = productsInterCondition.length; 
            for(let i = 0; i < len; i++ ) {
                productsInterCondition[i] && productsInterCondition.push(productsInterCondition[i]);  
            }
            productsInterCondition.splice(0 , len);  
            for(let i=0; i<productsInterCondition.length; i++){
                    inter.push(productsInterCondition[i]);
            }
        } else {
            for(let i=0; i<allProducts.length; i++){
                    inter.push(allProducts[i]);
            }
        }
        if(priceMore > 0) {
            for(let i=0; i<inter.length; i++){
                if(inter[i].price < priceMore){
                    delete inter[i];
                }
            }
            inter = inter.filter((a)=> a);
        }
        if(priceLess > 0) {
            for(let i=0; i<inter.length; i++){
                if(inter[i].price > priceLess){
                    delete inter[i];
                }
            }
            inter = inter.filter((a)=> a);
        }
        if(key) {
            setSearch(key);
            const regex = new RegExp(`${search}`);
            for(let i=0; i<inter.length; i++){ 
                if(!regex.test(inter[i].name)) {
                    delete inter[i];
                }
            }
            inter = inter.filter((a)=> a);
        }
        setProducts(inter);
        }   

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
                                                                        deleteProduct(item._id);
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