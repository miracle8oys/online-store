import {useLayoutEffect} from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import './Product.css';

const CartItem = ({cart, deleteItem, setChanges}) => {

    const cartRef = doc(db, "carts", cart.id);
    useLayoutEffect(() => {
        //setTotalPrice(cart.product_price * cart.quantity);
        if (cart.quantity <= 0) {
            deleteItem(cart.id);
            console.log("delete");
        }
    }, [cart.quantity, cart.id, deleteItem]);
    const multiplyItem = async () => {
        await updateDoc(cartRef, {
            quantity: cart.quantity + 1
        });
        //window.location.reload();
        //
        setChanges(totalChange => totalChange + 1);
    }

    const reduceItem = async () => {
        await updateDoc(cartRef, {
            quantity: cart.quantity - 1
        });
        // window.location.reload();
        setChanges(totalChange => totalChange + 1);
    }
    return ( 
        <div className="cart-detail mx-3">
            <div className="col-3">
                <img src={cart.product_image} alt="thumbnail" />
            </div>
            <div className="col-3">
                {cart && <h3>{cart.product_name}</h3>}
                <p>Rp. {Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(cart.product_price)}</p>
            </div>
            <div className="cart-btn col-1">
                <button className="btn btn-sm btn-primary" onClick={multiplyItem}>Add</button>
                <button className="btn btn-sm btn-warning" onClick={reduceItem}>Rem</button>
            </div>
            <div className="col mt-2">
                <h1>x {cart.quantity}</h1>
            </div>
        </div>
     );
}
 
export default CartItem;