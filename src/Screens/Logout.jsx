import { getAuth, signOut } from "firebase/auth"; // Import Firebase functions
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../Win95.css';

function Logout() {
  const auth = getAuth();
  const navigate = useNavigate(); // Use React Router's navigate hook for redirection

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect the user to the login page or home page
      navigate("/login"); // Change this to your desired route
    } catch (error) {
      console.error("Logout failed: ", error.message);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5" style={{ backgroundColor: 'teal', padding: '20px', color: 'white', minHeight: '100vh' }}>
      <div className="card custom-card-width square" style={{ width: '60%', maxWidth: '600px' }}>
        <div className="card-header w95">
          <h4 className="my-0 font-weight-normal text-center">
            Logout
          </h4>
        </div>
        <div className="card-body text-center">
          <p>Are you sure you want to log out?</p>
          <div className="d-flex justify-content-center mt-3">
            <button type="button" className="btn btn-primary mr-2" onClick={handleLogout}>Yes</button>
            <button type="button" className="btn btn-primary">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
