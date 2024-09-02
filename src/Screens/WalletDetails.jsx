import "../Win95.css";
import copyicon from "../assets/icons/copyicon.png";
import settingicon from "../assets/icons/settings_gear-0.png";

function WalletDetails() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "teal",
        padding: "20px",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <div className="card custom-card-width square" style={{ width: "80%", maxWidth: "600px" }}>
        <div className="card-header w95">
          <h4 className="my-0 font-weight-normal text-center">
            Wallet Details
          </h4>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-5">
              <strong>Wallet Name:</strong>
            </div>
            <div className="col-7 d-flex align-items-center">
              John
              <img src={settingicon} alt="" className="icon-16-4 ml-2" />
              <span className="ml-auto" style={{ color: "green" }}>
                +56%
              </span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-5">
              <strong>Wallet Address:</strong>
            </div>
            <div className="col-7 d-flex align-items-center">
              daxasxfgaxdaxfaxfad 
              <button className="btn btn-primary ml-auto">
              <img src={copyicon} alt="copy icon" style={{
                height: "35px",
                width: "35px",
              }} className="" />
              </button>
            </div>
          </div>
          <hr />
          <h5 className="text-center">Current Wallet</h5>
          <div className="row mb-2">
            <div className="ml-3">
              <span>SOL: </span>
              <span>20($100)</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="ml-3">
              <span>USDT: </span>
              <span >20($100)</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="ml-3">
              <span>USDC: </span>
              <span>20($100)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletDetails;
