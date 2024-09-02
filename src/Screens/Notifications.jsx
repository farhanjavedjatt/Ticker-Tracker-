import "../Win95.css";
import settingicon from "../assets/icons/settings_gear-0.png";
import { useNavigate, Link } from "react-router-dom";

function NotificationCenter() {
  const navigate = useNavigate();
  const handleNotificationClick = (type) => {
    navigate(type);
  };

  // Example counts for unread notifications
  const securityAlertsCount = 3;
  const investmentAlertsCount = 5;
  const profitAlertsCount = 2;

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh", marginTop: "100px" }}
    >
      <div className="card custom-card-width square">
        <div className="card-header w95 d-flex justify-content-between align-items-center">
          <h4 className="my-0 font-weight-normal text-center flex-grow-1">
            Notifications
          </h4>
          <Link to="/Noti-settings">
            <button className="btn btn-primary ml-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <img src={settingicon} alt="icon" className="icon-24-24" style={{ width: '24px', height: '24px' }} />
            </button>
          </Link>
        </div>
        <div className="card-body text-center">
          <div className="d-flex justify-content-center mt-3">
            <button type="button" className="btn btn-primary mr-2 position-relative">
              Investment Alerts
              {investmentAlertsCount > 0 && (
                <span className="badge badge-danger position-absolute" style={{ top: '-10px', right: '-10px' }}>
                  {investmentAlertsCount}
                </span>
              )}
            </button>
            <button type="button" className="btn btn-primary mr-2 position-relative">
              Profit Alerts
              {profitAlertsCount > 0 && (
                <span className="badge badge-danger position-absolute" style={{ top: '-10px', right: '-10px' }}>
                  {profitAlertsCount}
                </span>
              )}
            </button>
            <button type="button" className="btn btn-primary position-relative">
              Security Alerts
              {securityAlertsCount > 0 && (
                <span className="badge badge-danger position-absolute" style={{ top: '-10px', right: '-10px' }}>
                  {securityAlertsCount}
                </span>
              )}
            </button>
          </div>
          <div className="notification-list mt-4">
            <button
              className="notification-item btn btn-link p-2 w-100"
              onClick={() => handleNotificationClick("/home")}
            >
              We have identified a login attempt that was not authorized. Please
              take immediate action to secure your account. If this was not you,
              change your password and review your account activity.
            </button>
          </div>
          <div className="notification-list mt-2">
            <button
              className="notification-item btn btn-link p-2 w-100"
              onClick={() => handleNotificationClick("/investment")}
            >
              The stock you have been monitoring, XYZ, has now reached the
              target price you set. Consider taking action based on your
              investment strategy. Review the stocks performance and make an
              informed decision.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationCenter;
