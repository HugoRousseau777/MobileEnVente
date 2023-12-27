import React from 'react';
const AddProduct =  ()=>{

    const [name, setName] = React.useState(''); // No need to import !
    const [price, setPrice] = React.useState('');
    const [condition, setCondition] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const addProduct = async ()=>{

        if(!name || !price || !company || !condition){
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id; // localStorage.getItem('user')._id doesnt work
        console.warn(userId);
        let result = await fetch("http://localhost:5000/add-product",{ // Doit être l'adresse de la route
            method:"post",
            body:JSON.stringify({name, price, condition, company, userId}),
            headers: {
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });
        result = await result.json();
        setName('');
        setPrice('');
        setCondition('');
        setCompany('');
        alert("Product added !");
    }

        const conditionButtons = document.getElementsByClassName("conditionButton");
        Array.from(conditionButtons).forEach(
            (condButton)=> {
            condButton.addEventListener("click", ()=> {
                // Allows to show to the user which value for condition is lastly got
                Array.from(conditionButtons).forEach((button)=> {
                    button.classList.remove("selected");
                })

                condButton.classList.add("selected");
            })
            })

      
            
    // size in select allows to show number of items to show
    // <button onClick={()=>setCondition("a")} When using set... directly in onClick, dont forget ()=>set...
    return (
        <div className="add-product">
            <h1>Add Product</h1>
            <select id="name-select" onChange={(e)=>{setName(e.target.value)}}>
                <option value="">Choose your phone in the list</option>
                <option value="iphone 1">iphone 1</option>
                <option value="iphone 2">iphone 2</option>
                <option value="iphone 3">iphone 3</option>
                <option value="samsung 1">Samsung 1</option>
                <option value="samsung 2">samsung 2</option>
            </select>
            <input id="price" type="number" step="50" placeholder="Enter your selling price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            {error  && !price && <span className='invalid-input'>Enter a valid price</span>}
            <div className="condition">
                <p>Condition of your phone :</p>
                <div className="containerCondBut">
                <button className="conditionButton" onClick={()=> {
                    setCondition("Perfect");
                    }}>Perfect</button> 
                <button className="conditionButton" onClick={()=>setCondition("Good")}>Good</button> 
                <button className="conditionButton" onClick={()=>setCondition("Ok")}>Ok</button> 
                <button className="conditionButton" onClick={()=>setCondition("Bad")}>Bad</button> 
                </div>
            </div>
            
            <input id="company" type="text" placeholder="enter company" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            {error  && !company && <span className='invalid-input'>Enter valid company</span>}
            <button id="addProduct" onClick={addProduct}>Add Product</button>
        </div>
    )
                }

export default AddProduct;