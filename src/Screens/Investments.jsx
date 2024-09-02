
import '../Win95.css';
import copyicon from '../assets/icons/copyicon.png'

function ManualInvestments() {
  return (
    <div className="container d-flex justify-content-center mt-5 pt-5">
      <div className="card custom-card-width square" >
        <div className="card-header w95">
          <h4 className="my-0 font-weight-normal text-center">
            Manual Investments
          </h4>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-4">
              <strong>Ticker Name:</strong>
            </div>
            <div className="col-8">
              Name of Ticker
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-4">
              <strong>Contract Address:</strong>
            </div>
            <div className="col-8">
              dasdasdadbeqhgeqkbqvduyqkjbq2313da <img src={copyicon} alt="copy icon" className="icon-16-4" /> 
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-4">
              <strong>Current Holdings:</strong>
            </div>
            <div className="col-8">
              $567
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-4">
              <strong>Last Purchase:</strong>
            </div>
            <div className="col-8">
              10/23/2023
            </div>
          </div>
          <hr />
          <div className="row mb-2">
            <div className="col-4">
              <strong>Investment Amount:</strong>
            </div>
            <div className="col-8 d-flex">
              <button type="button" className="btn btn-primary mr-2">$10</button>
              <button type="button" className="btn btn-primary mr-2">$20</button>
              <button type="button" className="btn btn-primary mr-2">$30</button>
              <button type="button" className="btn btn-primary">Custom Amount</button>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-4">
              <strong>Investment Amount:</strong>
            </div>
            <div className="col-8">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="investmentOptions" id="solana" />
                <label className="form-check-label" htmlFor="solana">Solana</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="investmentOptions" id="usdt" />
                <label className="form-check-label" htmlFor="usdt">USDT</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="investmentOptions" id="usdc" />
                <label className="form-check-label" htmlFor="usdc">USDC</label>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="button" className="btn btn-primary mr-2">Confirm</button>
          </div>
          <div className="text-center mt-2 d-flex justify-content-between ml-5 mr-5 pl-5 pr-5">
  <button type="button" className="btn btn-primary mr-2">Skip</button>
  <button type="button" className="btn btn-primary">Next</button>
</div>

        </div>
      </div>
    </div>
  );
}

export default ManualInvestments;
