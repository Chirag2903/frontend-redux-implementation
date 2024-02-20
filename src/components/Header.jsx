import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from 'react-redux';

const Header = () => {
  const { cartitems } = useSelector(state => state.cart);
  return (
    <div>
      <nav>
        <img width="48" height="48" src="https://img.icons8.com/color/48/counter-strike-global-offensive.png" alt="counter-strike-global-offensive" />
        <div>
          <Link to={'/'}>Home</Link>
          <Link to={'/cart'}><FiShoppingBag />
            <p>{cartitems.length}</p></Link>

        </div>
      </nav>

    </div>
  )
}

export default Header