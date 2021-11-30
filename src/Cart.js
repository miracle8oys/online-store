import { useCallback, useEffect, useState, useContext } from "react";
import {collection, addDoc, deleteDoc, getDocs, doc, where, query} from "firebase/firestore";
import { db } from "./config/firebase";
import { useNavigate } from "react-router";
import CartItem from "./CartItem";
import {CartContext} from './App';
const Cart = ({user_id}) => {

    const [userCart, setUserCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [changes, setChanges] = useState(1);
    const navigate = useNavigate();

    const orderRef = collection(db, "orders");

    const {cartCount, setCartCount} = useContext(CartContext);

        useEffect(() => {
       
            const cartRef = query(collection(db, "carts"), where("uid", "==", `${user_id}`));
            try {
                const getProducts = async () => {
                    const data = await getDocs(cartRef);
                    setUserCart(data.docs.map(doc => (
                        {
                            ...doc.data(),
                            id: doc.id
                        }
                    )));
                }
                getProducts();
            } catch (err) {
                console.log(err.message);
            }
        }, [user_id, changes]);

    const deleteItem = useCallback(async (id) => {
        const itemRef = doc(db, 'carts', id);
        await deleteDoc(itemRef);
        setChanges(totalChange => totalChange + 1);
    }, []);

    useEffect(() => {
        let total = 0;
        userCart.forEach(item => {
            total = total + item.product_price * item.quantity;
        });
        setCartCount(userCart.length);
        setTotalPrice(total);
    }, [userCart, setCartCount])


    const deleteCart = () => {
        userCart.forEach( async cart => {
            const itemRef = doc(db, 'carts', cart.id);
            await deleteDoc(itemRef);
        });
        navigate("/checkout");
    }


    const handleCheckout = async () => {
        let purchaseOrder = []
        userCart.forEach(cart => {
            const item = {
                id: cart.id,
                name: cart.product_name,
                price: cart.product_price,
                quantity: cart.quantity,
                total: cart.quantity * cart.product_price
            }

            purchaseOrder = [...purchaseOrder, item]

        });
        await addDoc(orderRef, {
            product: purchaseOrder,
            user: user_id,
            total: totalPrice,
            payment: false
        });
        setCartCount(0);
        deleteCart();
    }
    
    return ( 
        <div className="cart">
            <div className="row mx-2 my-2 navbar">
                <div className="col">
                    <h1 onClick={() => navigate("/")} className="text-start"><i className="fas fa-arrow-left"></i></h1>
                </div>
                <div className="col pb-1">
                    <h1>{cartCount}</h1>
                </div>
                <div className="col">
                    <h1 className="text-end"><i className="far fa-heart"></i></h1>
                </div>
                <div className="col-2">
                    <h1 className="text-end"><i className="fas fa-bars"></i></h1>
                </div>
            </div>
            {userCart.map(cart => (
                <div key={cart.id} className="cart-item">
                    <CartItem cart={cart} deleteItem={deleteItem} setChanges={setChanges} setTotalPrice={setTotalPrice} />
                </div>
            ))}
            <div className="row mx-3 my-5">
                <div className="col text-start">
                    <h2 className="mt-1">Rp. {Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(totalPrice)}</h2>
                </div>
                <div className="col text-end">
                    <button onClick={handleCheckout} className="btn btn-success">Checkout</button>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;