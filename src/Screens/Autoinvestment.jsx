import "../Win95.css";

function Autoinvestment() {
  function saveSettings() {
    const pin = prompt("Please enter your PIN to save changes:");
    if (pin) {
      // Add logic to save settings here
      alert("Settings saved successfully!");
    } else {
      alert("PIN entry canceled. Settings not saved.");
    }
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center mt-11"
      style={{
        backgroundColor: "teal",
        color: "white",
        minHeight: "100vh",
        marginTop: "40px",
      }}
    >
      <div className="card custom-card-width square" style={{ width: "80%", maxWidth: "600px" }}>
        <div className="card-header w95">
          <h4 className="my-0 font-weight-normal text-center">Auto-Invest</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="autoInvest"
                  id="enableAutoInvest"
                />
                <label className="form-check-label" htmlFor="enableAutoInvest">
                  Auto-invest enabled
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="autoInvest"
                  id="disableAutoInvest"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="disableAutoInvest">
                  Auto-invest disabled
                </label>
              </div>
            </div>
            <hr />
            <h5 className="text-center">Ranking System</h5>
            <div className="form-group">
              <label htmlFor="ranking1">1.</label>
              <select id="ranking1" className="form-control form-95">
                <option>SOL: 20($100)</option>
                <option>USDT: 20($100)</option>
                <option>USDC: 20($100)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ranking2">2.</label>
              <select id="ranking2" className="form-control form-95">
                <option>USDT: 20($100)</option>
                <option>SOL: 20($100)</option>
                <option>USDC: 20($100)</option>
                <option>None</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ranking3">3.</label>
              <select id="ranking3" className="form-control form-95">
                <option>USDC: 20($100)</option>
                <option>SOL: 20($100)</option>
                <option>USDT: 20($100)</option>
                <option>None</option>
              </select>
            </div>
            <div className="form-group text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveSettings}
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Autoinvestment;
