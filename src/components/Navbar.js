import "../App.css";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth"; 
//import { signOut } from "firebase/auth";

export const Navbar = () => {

    //const [user, loading, error] = useAuthState(auth);
    const [user] = useAuthState(auth);

    // const signUserOut = async () => {
        
    //     await signOut(auth);
    // }

    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark" >
          <div className="container-fluid">
          <Link className="navbar-brand" to="/">KIWI</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              {user ? <Link className="nav-link" to="/createpost">Create Post</Link> : <Link className="nav-link" to="/login">Login</Link>}
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success me-2" type="submit">Search</button>
                { user && (
                    <>
                <p className="text-white m-2">{user?.displayName}</p>
                <img src={user?.photoURL || "https://live.staticflickr.com/5694/30494157195_47f0c84c03_b.jpg"} alt="profile" width="50" height="50" className="rounded-circle me-2" />
                {/* <button className="btn btn-outline-danger" type="submit" onClick={signUserOut}>Sign Out</button> */}
                <button className="btn btn-outline-danger" type="submit" onClick={() => auth.signOut()}>Sign Out</button>

                </>
                )}   
              </form>
            </div>
          </div>
        </nav>
    );
    }