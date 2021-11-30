import { useState, useEffect } from "react";
import { query, collection, where, getDocs } from "@firebase/firestore";
import { db } from "./config/firebase";
const Checkout = ({user_id}) => {

    const [userOrder, setUserOrder] = useState([]);

    useEffect(() => {
        const orderRef = query(collection(db, "orders"), where("user", "==", `${user_id}`));
        try {
            const getPurcaseOrder = async () => {
                const data = await getDocs(orderRef);
                setUserOrder(data.docs.map(order => (
                    {
                        ...order.data(),
                        id: order.id
                    }
                )));
            }
            getPurcaseOrder();
        } catch (err) {
            console.log(err.message);
        }
    }, [user_id])
    return ( 
        <div className="ceckout">
            {userOrder && userOrder.map(order => (
                <div className="order my-3" key={order.id}>
                    {order.product.map(item => (
                        <div className="product-order" key={item.id}>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>Rp. {Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>Rp. {Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(item.total)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                    <h1>Rp. {Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(order.total)}</h1>
                    <hr />
                    <br />
                </div>
            ))}
            <p>Confirm your payment to +6281945795745</p>
        </div>
     );
}
 
export default Checkout;