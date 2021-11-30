import { doc, getDoc, collection, addDoc } from "@firebase/firestore";
import { db } from "./config/firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./widescreen.css"
const ProductDetail = ({user}) => {
    let {id} = useParams();
    const [data, setData] = useState({});
    const CartRef = collection(db, "carts");
    const navigate = useNavigate();

    useEffect(() => {
        const productRef = doc(db, "products", id);
        const getData = async () => {
            const newData = await getDoc(productRef);
            setData({
                id: newData.id,
                name: newData.data().name,
                price: newData.data().price,
                image: newData.data().image
            });
        }
        getData();
    }, [id]);

    const addToCart = async (product_id, product_name, product_price, product_image) => {
        if (!user) {
            return (
                <h1>Access Not Allowed</h1>
            )
        }
        await addDoc(CartRef, {
            uid: user.uid,
            product_id: product_id,
            product_name: product_name,
            product_price: product_price,
            product_image: product_image,
            quantity: 1
        });
        navigate("/cart");
    }

    return ( 
        <div className="detail-product">
            <img src={data.image} alt="productImage" />
            <div className="desc-detail mx-3">
                <h1>Rp. {Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(data.price)}</h1>
                <p>{data.name}</p>
            </div>
            <button onClick={() => addToCart(data.id, data.name, data.price, data.image)} className="btn btn-outline-success">Buy</button>
        </div>
     );
}
 
export default ProductDetail;