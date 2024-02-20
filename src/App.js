import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";
import productlist from "./product.json";
import ProductDetails from "./components/ProductDetails";

import "./styles/app.scss"



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetails productlist={productlist} />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
