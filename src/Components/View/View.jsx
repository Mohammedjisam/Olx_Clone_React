import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import "./View.css";
import { postContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/FirebaseContext";

function View() {
    const [userDetails, setUserDetails] = useState();
    const { postDetails } = useContext(postContext);
    const { db } = useContext(FirebaseContext);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!postDetails) {
                console.log("postDetails is undefined");
                return;
            }

            const { userId } = postDetails;
            console.log("Fetching details for userId:", userId);

            try {
                const q = query(collection(db, "users"), where("uid", "==", userId));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("No matching documents found");
                } else {
                    querySnapshot.forEach((doc) => {
                        console.log("Document data:", doc.data());
                        setUserDetails(doc.data());
                    });
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [db, postDetails]);

    return (
        <div className="viewParentDiv">
            <div className="imageShowDiv">
                <img src={postDetails?.image || ""} alt="Product" />
            </div>
            <div className="rightSection">
                <div className="productDetails">
                    <p>&#x20B9; {postDetails?.price || 0} </p>
                    <span>{postDetails?.name || "No name available"}</span>
                    <p>{postDetails?.category || "No category"}</p>
                    <span>{postDetails?.createdAt?.toDate().toLocaleDateString() || "No date available"}</span>
                </div>
                <div className="contactDetails">
                    <p>Seller details</p>
                    <p>{userDetails?.username || "....."}</p>
                    <p>{userDetails?.phone || "...."}</p>
                    <p>{userDetails?.email || "...."}</p>
                </div>
            </div>
        </div>
    );
}

export default View;
