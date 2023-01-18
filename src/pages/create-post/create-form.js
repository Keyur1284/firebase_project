import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom"; 


export const CreateForm = () => {

    const schema = yup.object().shape({
        
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
    });

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });

    const postRef = collection(db, "posts");
    const [user] = useAuthState(auth);
    const navigate = useNavigate();


    const onCreatePost = async (data) => {
        
        await addDoc(postRef, {
            // ...data,
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        });

        navigate("/");
    }

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit(onCreatePost)}>
                        <input className="form-control" type="text" placeholder="Enter title" aria-label="default input example" {...register("title")}/>
                        <p className="text-danger">{errors.title?.message}</p>
                        <textarea className="form-control" placeholder="Enter description" id="exampleFormControlTextarea1" rows="5"  {...register("description")}/>
                        <p className="text-danger">{errors.description?.message}</p>
                        {/* <input className="form-control" type="submit"/> */}
                        <button className="btn btn-primary">Submit</button>
                        {/* <input className="btn btn-primary" type="submit" value="Submit" /> */}
                    </form>
                </div>
            </div>
        </div>
    )
}