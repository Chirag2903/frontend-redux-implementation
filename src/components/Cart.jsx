import React from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Cart = () => {
    const { cartitems, subTotal, shipping, tax, total } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const increment = (id) => {
        dispatch({
            type: "addtocart",
            payload: { id }
        });
        dispatch({ type: "calculate" });
    }
    const decrement = (id) => {
        dispatch({
            type: "decrement",
            payload: id
        });
        dispatch({ type: "calculate" });
    }
    const deleteHandler = (id) => {
        dispatch({
            type: "deletefromcart",
            payload: id
        });
        dispatch({ type: "calculate" });
    }


    return (
        <div className='cart'>
            <main>
                {
                    cartitems.length > 0 ? (
                        cartitems.map(i => (
                            <CartItem imgSrc={i.imgSrc} name={i.name} price={i.price} qty={i.quantity} id={i.id} key={i.id} decrement={decrement} increment={increment} deleteHandler={deleteHandler} />
                        ))
                    ) : <><div className='no-product'><h1>No items in the cart <img width="64" height="64" src="https://img.icons8.com/ios-filled/100/FCC419/shopping-cart.png" alt="shopping-cart" /></h1>
                        <Link to={"/"}><button>Go to Home</button></Link>
                    </div>
                    </>

                }
            </main>
            <aside>
                <h2><span>SubTotal:</span> ₹{subTotal}</h2>
                <h2><span>Shipping:</span>₹{shipping}</h2>
                <h2><span>Tax:</span>₹{tax}</h2>
                <h2><span>Total:</span>₹{total}</h2>
                <button>Proceed</button>
            </aside>
        </div>
    )
}

const CartItem = ({ imgSrc, name, price, qty, decrement, increment, deleteHandler, id }) =>
(
    <div className="cartitem">
        <img src={imgSrc} alt="Item" />
        <article>
            <h3>{name}</h3>
            <p>Rs{price}</p>
        </article>
        <div>
            <button onClick={() => decrement(id)}>-</button>
            <p>{qty}</p>
            <button onClick={() => increment(id)}>+</button>
        </div>
        <AiFillDelete onClick={() => deleteHandler(id)} />
    </div>
)

export default Cart