
import "../Win95.css";

function NotiSettings() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh", marginTop: "5rem" }}
    >
      <div className="card custom-card-width square" style={{ width: "80%", maxWidth: "900px" }}>
        <div className="card-header w95 text-center">
          <h4 className="my-0 font-weight-normal">Notification Preferences</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group row">
              <div className="col-sm-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="receiveEmails"
                  />
                  <label className="form-check-label" htmlFor="receiveEmails">
                    Receive Emails
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inAppNotifications"
                  />
                  <label className="form-check-label" htmlFor="inAppNotifications">
                    In-App Notifications
                  </label>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="enableSecurityAlerts"
                  />
                  <label className="form-check-label" htmlFor="enableSecurityAlerts">
                    Enable Security Alerts
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="enableInvestmentAlerts"
                  />
                  <label className="form-check-label" htmlFor="enableInvestmentAlerts">
                    Enable Investment Alerts
                  </label>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="enableProfitAlerts"
                  />
                  <label className="form-check-label" htmlFor="enableProfitAlerts">
                    Enable Profit Alerts
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NotiSettings;
