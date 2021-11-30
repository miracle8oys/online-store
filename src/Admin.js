import {collection, getDocs, where, query, doc, deleteDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import { useSearchParams, Link } from "react-router-dom";
import './Product.css';
const Admin = ({user}) => {

    let [urlParams] = useSearchParams();
    const keyword = urlParams.get("keyword");

    const [products, setProducts] = useState([]);
    const [change, setChange] = useState(0);

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
    }, [keyword, change]);

    if (user?.uid !== "3HX9LIB9HNRBJpdhsDuwiSKayXC2") {
        return (
            <h1>Access Not Allowed</h1>
        )
    }

    const deleteItem = async (id) => {
        console.log(id);
        const itemRef = doc(db, 'products', id);
        await deleteDoc(itemRef);
        setChange(prevChange => prevChange +1);
    };

    return ( 
        <div className="products-admin my-3 mx-2">
            <Link to="/create"><button className="btn btn-success">Create</button></Link>
            {products.map(product => (
                <div className="display-product-admin" key={product.id}>
                    <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Region</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img className="image" height="30px" width="30px" src={product.image} alt="product" /></td>
                            <td><p className="name">{product.name}</p></td>
                            <td><p className="regional">{product.regional}</p></td>
                            <td><p className="price">{Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(product.price)}</p></td>
                            <td>
                                <div className="admin-btn">
                                <button onClick={() => deleteItem(product.id)} className="btn btn-sm btn-danger">Delete</button>
                                <Link to={`/update/${product.id}`}>
                                    <button className="btn btn-sm btn-warning mt-2">Update</button>
                                </Link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    </table>  
                </div>
            ))}
        </div>
     );
}
 
export default Admin;