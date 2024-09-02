import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";  // Assuming you have Firebase Firestore setup
import "../Win95.css";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Closeenv from '../assets/icons/envelope_closed-1.png';
import keys from '../assets/icons/keys-0.png';
import google from '../assets/logo/google.svg';
import faceid from '../assets/logo/faceid.png';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save username in Firebase Authentication
      await updateProfile(user, {
        displayName: username,
      });

      // Save username in Firestore database
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        pin: "",
        pinEnabled: false,
        password: password
      });

      navigate("/home");  // Redirect to profile page after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;
      // Extract user details
      const username = user.displayName || "No username";
      const email = user.email || "No email";

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        pin: "",
        pinEnabled: false,
        password: ""
      });
      console.log("User info:", user); // Check user info
      navigate("/home");
    } catch (error) {
      console.error("Failed to log in with Google:", error.message);
      alert("Failed to log in with Google: " + error.message);
    }
  };

  const onsignin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="container-center">
        <div className="card custom-card-width">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal text-center">Sign Up Here</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSignup}>
              {error && <p className="error-message">{error}</p>}
              <div className="form-group row">
                <label htmlFor="inputUsername" className="col-sm-2 col-form-label">
                  <img src={keys} className="icon-16-4" alt="Username Icon" /> 
                  Username
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-95"
                    id="inputUsername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  <img src={Closeenv} className="icon-16-4" alt="Email Icon" /> 
                  Email <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-95"
                    id="inputEmail3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                  <img src={keys} className="icon-16-4" alt="Password Icon" /> 
                  Password <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-95"
                    id="inputPassword3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="ml-custom">
              <div className="d-flex justify-content-center">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  // style={{  width: '100px', height: '45px' }}
                >
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Confirm<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </button>
              </div>
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <button onClick={onsignin} className="btn btn-primary">
                      Login
                    </button>
                    {/* <button className="btn btn-primary ml-3">
                      Sign up
                    </button> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-10 custom-google-button">
                    <button className="btn btn-primary" onClick={handleGoogleSignIn}>
                      <img src={google} className="custom-google mt-1" alt="Google Icon" />
                    </button>
                    <button className="btn btn-primary ml-3">
                      <img src={faceid} className="custom-image mt-1" alt="Face ID Icon" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
