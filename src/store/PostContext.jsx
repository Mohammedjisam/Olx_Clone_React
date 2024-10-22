import { createContext, useState } from "react";

// Create the context
export const postContext = createContext(null);

function PostProvider({ children }) {
    // Define state for postDetails and the setter function
    const [postDetails, setPostDetails] = useState(null);

    // Provide both postDetails and setPostDetails as an object
    return (
        <postContext.Provider value={{ postDetails, setPostDetails }}>
            {children}
        </postContext.Provider>
    );
}

export default PostProvider;
