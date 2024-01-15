import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProduct =  ()=>{

    const [name, setName] = React.useState(''); // No need to import !
    const [price, setPrice] = React.useState('');
    const [condition, setCondition] = React.useState('');
    const [company, setCompany] = React.useState('');

    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=> {
        getProductDetails();
    }, []);
    const getProductDetails = async ()=>{
        let result = await fetch(`https://uuu-3fwk.onrender.com/product/${params.id}`, {
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result =await result.json();
        setName(result.name);
        setPrice(result.price);
        setCondition(result.condition);
        setCompany(result.company);
    }


    const updateProduct = async ()=>{
        let result = await fetch(`https://uuu-3fwk.onrender.com//product/${params.id}`, {
            method:'Put',
            body:JSON.stringify({name,price,condition,company}),
            headers: {
                'Content-Type':'Application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        navigate('/');
    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="enter name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
           
            <input type="text" placeholder="enter price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
           
            <input type="text" placeholder="enter category" value={condition} onChange={(e)=>{setCondition(e.target.value)}}/>
           
            <input type="text" placeholder="enter company" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
           
            <button onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;