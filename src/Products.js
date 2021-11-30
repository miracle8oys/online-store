import {collection, getDocs, where, query} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import { useSearchParams, Link } from "react-router-dom";
import './Product.css';
import Carousel from "./Carousel";
const Products = () => {

    let [urlParams] = useSearchParams();
    const keyword = urlParams.get("keyword");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        
        let productsRef = '';
        if (!keyword) {
            productsRef = query(collection(db, "products"));
        } else {
            productsRef = query(collection(db, "products"), where("name", ">=", keyword), where("name", "<=", keyword+ 'uf8ff'));
        }
        try {
            const getProducts = async () => {
                const data = await getDocs(productsRef);
                setProducts(data.docs.map(doc => (
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
    }, [keyword]);

    return ( 
        <>
            <Carousel />
            <div className="products my-3 mx-2">
                {products.map(product => (
                    <Link to={`/detail/${product.id}`} className="display-product" key={product.id}>
                        <img className="product-image" width="175px" src={product.image} alt="product" />
                        <p className="product-name">{product.name}</p>
                        <h3 className="product-price">Rp. {Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(product.price)}</h3>
                        <p className="product-regional">{product.regional}</p>
                    </Link>
                ))}
            </div>
        </>
     );
}
 
export default Products;