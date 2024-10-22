import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { getDocs, collection } from "firebase/firestore";
import { postContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/FirebaseContext";

function Posts() {
  const { db } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(postContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const allProducts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Include the document ID
        }));
        setProducts(allProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, [db]);

  if (loading) {
    return <div className="loading">Loading...</div>; // Display a loading indicator
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id} // Add key prop with unique identifier
              onClick={() => {
                setPostDetails(product);
                navigate("/viewpost");
              }}
            >
              <div className="favorite">{/* <Heart /> */}</div>
              <div className="image">
                <img
                  src={product.image || "placeholder-image-url"} // Use placeholder image if product.image is not available
                  alt={product.name || "Product Image"} // Fallback alt text
                />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>
                  {product.createdAt
                    ? product.createdAt.toDate().toLocaleDateString()
                    : "Unknown Date"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
