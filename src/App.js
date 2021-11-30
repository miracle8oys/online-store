import './App.css';
import React from 'react';
import { auth, signInWithGoogle} from "./config/firebase";
import {signOut, onAuthStateChanged} from "firebase/auth";
import { useState } from 'react';
import Products from './Products';
import AddProduct from './AddProduct';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './Navbar';
import Cart from './Cart';
import ProductDetail from './ProductDetail';
import Checkout from './Checkout';
import Admin from './Admin';
import UpdateProduct from './UpdateProduct';


export const CartContext = React.createContext();

function App() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  }

  const [cartCount, setCartCount] = useState(0);

  return (
  <CartContext.Provider value={{cartCount, setCartCount}}>
    <BrowserRouter>
    <div className="App">
      <Routes>
          <Route path="/" 
            element={
              <>
                <Navbar user={user} logout={logout} signInWithGoogle={signInWithGoogle} />
                <Products/>
              </>
          } />
          <Route path="/create" element={<AddProduct user={user} />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<Cart  user_id={user?.uid} />} />
          <Route 
            path="/detail/:id" 
            element={
              <>
                <Navbar user={user} logout={logout} signInWithGoogle={signInWithGoogle} />
                <ProductDetail user={user} />
              </>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <>
                <Navbar user={user} logout={logout} signInWithGoogle={signInWithGoogle} />
                <Checkout user_id={user?.uid} />
              </>
            } 
          />
          <Route path="/admin" 
            element={
              <>
                <Navbar user={user} logout={logout} signInWithGoogle={signInWithGoogle} />
                <Admin user={user}/>
              </>
          } />
      </Routes>
    </div>
    </BrowserRouter>
  </CartContext.Provider>
  );
}

export default App;
