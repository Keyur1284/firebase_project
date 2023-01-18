import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import { useAuthState } from "react-firebase-hooks/auth";


export const Home = () => {

    const [postsList, setPostsList] = useState(null);
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef); 
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        
    }
    
    useEffect(() => {
        getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [user] = useAuthState(auth);

    return (
        <div className="container mt-1">
            <h1>Home Page</h1> 
            <div>
                <h1>Posts</h1> 
                <div>
                    {user && postsList?.map((post,index) => (
            <Post post={post} key={index}/>) )}</div> 
            </div>
        </div>
    );
};