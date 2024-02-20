import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProductDetails = ({ productlist }) => {

    const [quantity, setquantity] = useState(1);
    const dispatch = useDispatch();
    const { productId } = useParams();
    const product = productlist.find(product => product.id === productId);

    if (!product) {
        return <div>Product not found!</div>;
    }

    const addtocart = () => {
        dispatch({
            type: "addtocart",
            payload: { ...product, quantity }
        });
        dispatch({ type: "calculate" });
        toast.success("Added to Cart")
    }

    const incrementQuantity = () => {
        setquantity(prevQuantity => prevQuantity + 1);
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setquantity(prevQuantity => prevQuantity - 1);
        }
    }
    return (
        <div className="product-details">
            <div className='product-details-left'>
                <img src={product.imgSrc} alt={product.name} />
            </div>
            <div className='product-details-right'>
                <h2>{product.name}</h2>
                <span>₹{product.price}</span>
                <div className='product-details-adding-product'>
                    <button className='add-delete-button' onClick={decrementQuantity}>-</button>
                    <quantity>{quantity}</quantity>
                    <button className='add-delete-button' onClick={incrementQuantity}>+</button>
                    <button className='Add-to-cart' onClick={() => addtocart()}>Add to Cart</button>
                </div>
                <p>Status: <color>Instock</color></p>
                <h3>Description: </h3>
                <p className='product-description'>{product.description}</p>
            </div>

        </div >
    );
};

export default ProductDetails;