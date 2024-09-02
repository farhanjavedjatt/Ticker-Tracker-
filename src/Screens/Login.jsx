import "../Win95.css";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Closeenv from '../assets/icons/envelope_closed-1.png'
import keys from '../assets/icons/keys-0.png'
import google from '../assets/logo/google.svg'
import  faceid from '../assets/logo/faceid.png'
import { getDoc, doc } from "firebase/firestore";
import { AuthContext } from '../AuthContext';
import { auth, db } from "../firebaseConfig"; // Adjust the path as needed
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";

import {
  $,
  _fetch,
  authenticate,
} from '../assets/client';

function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if WebAuthn and Conditional UI are supported

  // }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("Failed to log in: " + error.message);
    }
  };

  const fetchUserById = async (userId) => {
    try {
      // Reference to the document
      const userDocRef = doc(db, "users", userId);
  
      // Fetch the document
      const docSnap = await getDoc(userDocRef);
  
      if (docSnap.exists()) {
        // Document exists, retrieve data
        const userData = docSnap.data();
        console.log(`UID: ${userId}`);
        console.log(`Username: ${userData.username}`);
        
        return { ...userData };
      } else {
        console.log("No user found with the given ID.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;
      navigate("/home");
    } catch (error) {
      console.error("Failed to log in with Google:", error.message);
      alert("Failed to log in with Google: " + error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      alert("Failed to send password reset email: " + error.message);
    }
  };

  async function authenticatePasskey (){
    if (window.PublicKeyCredential && PublicKeyCredential.isConditionalMediationAvailable) {
      PublicKeyCredential.isConditionalMediationAvailable().then(async (available) => {
        if (available) {
          // Autofill passkey
          try {
            const user_ret = await authenticate(); // Await the authenticate function here
            const user = await fetchUserById(user_ret.id);

            if (!user.password){
              alert("Cannot use Passkey for a Google Account!")
            }
            else {
              await signInWithEmailAndPassword(auth, user.email, user.password);
              navigate("/home");
            }

          } catch(error) {
            if (error.name !== "NotAllowedError") {
              console.error("WebAuthn authentication failed:", error);
              alert(error.message);
            }
          };
        }
      }).catch((error) => {
        console.error("Error checking for Conditional Mediation:", error);
      });
    }
  };

  const handleSignup = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container-center">
        <div className="card custom-card-width">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal text-center">Login Here</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  <img src={Closeenv} className="icon-16-4" alt="Email Icon" />
                  Email <span>&nbsp;&nbsp;&nbsp;</span>
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
                  Password
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
              <div className="form-group row">
                <div className="col-sm-10 offset-sm-2">
                  <a
                    href="#!"
                    className="small-text"
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={handlePasswordReset}
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className="ml-custom">
                <div className="row mb-4">
                  <div className="col-sm-10">
                    <button onClick={handleLogin} type="submit" className="btn btn-primary">
                      Login
                    </button>
                    <button onClick={handleSignup} type="button" className="btn btn-primary ml-3">
                      Sign up
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-10">
                    <button type="button" className="btn btn-primary" onClick={handleGoogleSignIn}>
                      <img src={google} className="custom-google mt-1" alt="Google Icon" />
                    </button>
                    <button type="button" className="btn btn-primary ml-3">
                      <img src={faceid} className="custom-image mt-1" alt="FaceID Icon" />
                    </button>
                    <button type="button" className="btn btn-primary ml-3" onClick={authenticatePasskey}>
                      Login using Passkey
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

export default Login;
