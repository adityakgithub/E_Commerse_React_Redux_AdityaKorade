import { BrowserRouter,Routes, Route} from "react-router-dom";
import Home from "./component/Home.jsx";
import Navbar from "./component/Navbar.jsx";
import About from "./component/About.jsx";
import Products from "./component/Products.jsx";
import ProductDetails from "./component/ProductDetails.jsx";
import ProductDetailInfo from "./component/ProductDetailInfo.jsx";
import ProductDetailNutrition from "./component/ProductDetailNutrition.jsx";
import ProductDetailStorage from "./component/ProductDetailStorage.jsx";
import Cart from "./component/Cart.jsx";
// import React from "react";
import { useState, useEffect } from "react";


import './App.css'

function App() {
  const [cart, setCart] = useState(()=>{
    if(localStorage.getItem("key-value")){
      return JSON.parse(localStorage.getItem("key-value"));
    }
    return [];
  });
  useEffect(()=>{
    localStorage.setItem("key-value",JSON.stringify(cart))
  },[cart])
  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => 
      product.id !== id
    );
    setCart(updatedCart);
  }
  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/about" element={<About />}>
          </Route>
          <Route path="/products" element={<Products
              cart={cart}
              onProductAdd={handleProductAdd}
              onProductDelete={handleProductDelete}
            />}>
          </Route>
          <Route
            path="/products/:id/"
            element={<ProductDetails onProductAdd={handleProductAdd} />}
          >
            <Route
              path=""
              element={<ProductDetailInfo onProductAdd={handleProductAdd} />}
            ></Route>

            <Route
              path="nutrition"
              element={<ProductDetailNutrition />}
            ></Route>

            <Route path="storage" element={<ProductDetailStorage />}></Route>
          </Route>
          <Route path="/cart" element={<Cart cart={cart} />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
