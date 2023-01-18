import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {

        const result = await signInWithPopup(auth, googleProvider);
        console.log(result);
        navigate("/");

        // signInWithPopup(auth, googleProvider) 
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const credential = GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential.accessToken;
        //         // The signed-in user info.
        //         const user = result.user;
        //         // ...
        //     }
        //     ).catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.email;
        //         // The AuthCredential type that was used.
        //         const credential = GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //     }
        //     );
    }
    
    return (
        <div className="container mt-1">
            <p className="display-3">Sign in with Google to continue</p>
            <button onClick={signInWithGoogle} className="btn btn-primary">Sign in with Google</button>
        </div>
    );
};