import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../store/FirebaseContext";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase/config";

const Create = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    // Validate form inputs
    const validateForm = () => {
        if (!name) {
            alert("Name is required");
            return false;
        }
        // Check if category is a valid string (not empty and contains only letters)
        if (!category || !/^[a-zA-Z\s]+$/.test(category)) {
            alert("Category must be a valid string (letters only)");
            return false;
        }
        if (!price) {
            alert("Price is required");
            return false;
        } else if (isNaN(price) || price <= 0) {
            alert("Enter a valid price");
            return false;
        }
        if (!image) {
            alert("Image is required");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!user) {
            alert("Please log in to add a product");
            return;
        }

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        try {
            const imageRef = ref(storage, `/images/${image.name}`);
            await uploadBytes(imageRef, image);
            const url = await getDownloadURL(imageRef);

            await addDoc(collection(db, "products"), {
                name,
                category,
                price: Number(price), // Ensure price is stored as a number
                image: url,
                userId: user.uid,
                createdAt: new Date(),
            });

            alert("Product added successfully!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Failed to add product. Please try again.");
        }
    };

    return (
        <Fragment>
            <Header />
            <div className="centerDiv">
                <label htmlFor="fname">Name</label>
                <br />
                <input
                    className="input"
                    type="text"
                    id="fname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label htmlFor="category">Category</label>
                <br />
                <input
                    className="input"
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <br />
                <label htmlFor="price">Price</label>
                <br />
                <input
                    className="input"
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br />

                <img
                    alt="Posts"
                    width="200px"
                    height="200px"
                    src={image ? URL.createObjectURL(image) : ""}
                />
                <br />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <br />
                <button onClick={handleSubmit} className="uploadBtn">
                    Upload and Submit
                </button>
            </div>
        </Fragment>
    );
};

export default Create;
