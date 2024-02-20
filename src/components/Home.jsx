import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import productlist from "../product.json";
import Typed from 'typed.js';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        const options = {
            strings: ["Welcome to CS Ecommerce", "Buy Good Quality Products", "Discout Upto 20% on each Product "],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 1000,
            loop: true,
        };
        const typed = new Typed(".typed-text", options);

        return () => {
            typed.destroy();
        };
    }, []);


    const addtocarthandler = (options) => {
        dispatch({
            type: "addtocart",
            payload: options
        });
        dispatch({ type: "calculate" });
        toast.success("Added to Cart")
    }

    return (
        <div className='home'>
            <div className='home-intro'>
                <h1><span className="typed-text"></span></h1>
            </div>
            <div className='home-products'>
                {
                    productlist.map(i => (
                        <ProductCard key={i.id} imgSrc={i.imgSrc} name={i.name} price={i.price} id={i.id} handler={addtocarthandler} />
                    ))
                }
            </div>
        </div>
    );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
    <div className="productcard">
        <Link to={`/product/${id}`}>
            <img src={imgSrc} alt={name} />
            <p>{name}</p>
            <h4>₹{price}</h4>
        </Link>
        <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>Add to Cart</button>
    </div >
)

export default Home