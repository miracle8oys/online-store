import { useState, useContext } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { CartContext } from "./App";
import "./widescreen.css";
const Navbar = ({user, logout, signInWithGoogle}) => {
    const navigate = useNavigate();
    const [urlParams, setUrlParams] = useSearchParams({});
    const [keyword, setKeyword] = useState('');
    const {cartCount} = useContext(CartContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUrlParams({keyword});
    }

    console.log({urlParams});

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container-fluid">
            {user && <img className="profile-pic" src={user.photoURL} alt="profile" />}
            <h2 onClick={() => navigate("/")} className="text-light">OnlineStore</h2>
            <i onClick={() => navigate("/cart")} className="nav-icon fas fa-cart-arrow-down text-light"></i>
            <p className="text-light cart-count">{cartCount}</p>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/checkout">Checkout</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/admin">Admin</Link>
                    </li>
                    <li className="nav-item">
                    {user? <button className="btn btn-sm btn-danger mt-2" onClick={logout}>Logout</button> : <button className="btn btn-primary mt-2" onClick={signInWithGoogle}>Login</button>}
                    </li>
                    
                </ul>
                <form onSubmit={handleSubmit} className="d-flex">
                    <input onChange={(e) => setKeyword(e.target.value) } name="keyword" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
        </nav>
     );
}
 
export default Navbar;