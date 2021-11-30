import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const UpdateProduct = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [region, setRegion] = useState('');

    useEffect(() => {
        const productRef = doc(db, "products", id);
        const getData = async () => {

            const newData = await getDoc(productRef);

            setName(newData.data().name);
            setPrice(newData.data().price);
            setRegion(newData.data().regional);
        }
        getData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const itemRef = doc(db, "products", id);
        await updateDoc(itemRef, {
            name: name,
            price: price,
            regional:region
        });
        navigate("/admin");
    }

    return ( 
        <div className="add-product">
            <form onSubmit={handleUpdate} className="my-3 mx-5">
                <div className="my-1">
                    <label className="form-label">Product Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="my-1">
                    <label className="form-label">Product Price</label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" />
                </div>
                <div className="my-1">
                    <label className="form-label">Regional</label>
                    <input value={region} onChange={(e) => setRegion(e.target.value)} type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
     );
}
 
export default UpdateProduct;