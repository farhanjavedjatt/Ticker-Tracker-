import { Link } from "react-router-dom";
import "../Win95.css";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light navbar-95 fixed-top">
        <a className="navbar-brand" href="/home">
          Ticker Tracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/wallet" className="nav-link">
                Wallets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notifications">
                Notification Center
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/home'>
                Security
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
