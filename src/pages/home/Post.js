import { addDoc, getDocs, deleteDoc, collection, query, where, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
// import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";


export const Post = (props) => {

    const [user] = useAuthState(auth);
    const { post } = props;
    const likesRef = collection(db, "likes");

    const [likes, setLikes] = useState(null);

    const likesDoc = query(likesRef, where("postId", "==", post.id ));

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post?.id,
                
            });
            
            if (user)
            {
                setLikes((prev) => [...prev, {userId: user?.uid, likeId: newDoc.id}])
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    const removeLike = async () => {

        const delLike = query(likesRef, where("postId", "==", post.id ), where("userId", "==", user.uid));

        const delData = await getDocs(delLike);

        const likeId = delData.docs[0].id;

        const unlike = doc(db, "likes", likeId);

        try {
            await deleteDoc(unlike);
            
            if (user)
            {
                setLikes((prev) => prev.filter((like) => like.likeId !== likeId))
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    const flag = likes?.find((likes) => likes.userId === user?.uid)

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ 
            userId: doc.data().userId, 
            likeId: doc.id
        })));
    }

    useEffect(() => {
        user && getLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <div className="container"  key={post?.userId}>
        <div className="card mt-3" >
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <p className="card-footer">@{post.username}
                <button onClick={flag? removeLike : addLike} className={flag? "btn btn-danger mx-2" : "btn btn-outline-danger mx-2"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg></button></p>
                {likes && <p>Likes: {likes?.length}</p>}
            </div>
        </div>
    </div>
    )
}