import React from 'react';
const AddProduct =  ()=>{

    const [name, setName] = React.useState(''); // No need to import !
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const addProduct = async ()=>{

        if(!name || !price || !company || !category){
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id; // localStorage.getItem('user')._id doesnt work
        console.warn(userId);
        let result = await fetch("http://localhost:5000/add-product",{ // Doit être l'adresse de la route
            method:"post",
            body:JSON.stringify({name, price, category, company, userId}),
            headers: {
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });
        result = await result.json();
        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
        alert("Product added !");
    }

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" placeholder="enter name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
           {error  && !name && <span className='invalid-input'>Enter valid name</span>}
            <input type="number" placeholder="enter price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            {error  && !price && <span className='invalid-input'>Enter a valid price</span>}
            <input type="text" placeholder="enter category" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            {error  && !category && <span className='invalid-input'>Enter valid category</span>}
            <input type="text" placeholder="enter company" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
            {error  && !company && <span className='invalid-input'>Enter valid company</span>}
            <button onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;