import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProduct =  ()=>{

    const [name, setName] = React.useState(''); // No need to import !
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');

    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=> {
        getProductDetails();
    }, []);
    const getProductDetails = async ()=>{
        console.warn(params);
        let result = await fetch(`https://uuu-3fwk.onrender.com/${params.id}`, {
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result =await result.json();
        console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }


    const updateProduct = async ()=>{
        console.warn(name,price,category,company);
        let result = await fetch(`https://uuu-3fwk.onrender.com/${params.id}`, {
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers: {
                'Content-Type':'Application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
        navigate('/');
    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="enter name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
           
            <input type="text" placeholder="enter price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
           
            <input type="text" placeholder="enter category" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
           
            <input type="text" placeholder="enter company" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
           
            <button onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;