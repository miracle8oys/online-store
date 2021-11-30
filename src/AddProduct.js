
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { useState } from "react";
import { storage } from "./config/firebase";
import { db } from "./config/firebase";
import { collection, addDoc } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProduct = ({user}) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [region, setRegion] = useState('');
    const [progres, setProgres] = useState(0);

    const productRef = collection(db, "products");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[3].files[0];
        uploadFile(file);
    }

    const uploadFile = (file) => {
        if (!file) {
            throw new Error("File Undefine");
        }

        const storageRef = ref(storage, `${file.name}`);
        const uploadProcess = uploadBytesResumable(storageRef, file);

        uploadProcess.on("state_changed", (snapshot) => {
            const currentProgres = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgres(currentProgres);
        }, (err) => {console.log(err)},
        () => {
            getDownloadURL(uploadProcess.snapshot.ref)
            .then(fileUrl => {
                uploadProduct(fileUrl);
            })
        })
    }

    const uploadProduct = async (fileUrl) => {
        await addDoc(productRef, 
            {
                name: name,
                price: price,
                regional: region,
                image: fileUrl
            });
        navigate('/');
    }

    if (user?.uid !== "3HX9LIB9HNRBJpdhsDuwiSKayXC2") {
        return (
            <h1>Access Not Allowed</h1>
        )
    }

    return ( 
        <div className="add-product">
            <form onSubmit={handleSubmit} className="my-3 mx-5">
                <div className="my-1">
                    <label className="form-label">Product Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="my-1">
                    <label className="form-label">Product Price</label>
                    <input onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" />
                </div>
                <div className="my-1">
                    <label className="form-label">Regional</label>
                    <input onChange={(e) => setRegion(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="my-1">
                    <label className="form-label">Product Image</label>
                    <input type="file" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p>{progres}%</p>
        </div>
     );
}
 
export default AddProduct;