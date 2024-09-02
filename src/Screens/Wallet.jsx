
import '../Win95.css'; 
import { useNavigate } from 'react-router-dom'; 
import settingicon from '../assets/icons/settings_gear-0.png'

function Wallets() {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/details');
  };
  const handleClick2 = () => {
    navigate('/Auto-investment');
  };

  return (
    <div style={{
      marginTop: "100px",
    }}
    className="custom-container1 d-flex mt-5 pt-5 items-center">
      <div className="card custom-fix">
        <div className="card-header w95">
          <h4 className="my-0 font-weight-normal text-center">
            Wallets
          </h4>
        </div>
        <div style={{
          paddingRight: "100px",
        }} className="card-body">
          {['Jhon', 'Carter', 'Bella'].map((name, index) => (
            <div key={index}>
              <div className="row mb-2 align-items-center">
                <div className="col-md-2">
                  <strong>Name:</strong>
                </div>
                <div className="col-md-2">
                  {name}
                </div>
                <div className="col-md-2">
                  <strong>Balance:</strong>
                </div>
                <div className="col-md-2">
                  ${name === 'Jhon' ? 200 : name === 'Carter' ? 300 : 50}
                </div>
                <div className="col-md-2">
                  <strong>ROI:</strong>
                </div>
                <div className="col-md-1">
                  {name === 'Jhon' ? '100%' : name === 'Carter' ? '200%' : '120%'}
                </div>
                <div className="col-md-1">
                  <div className="btn-group">
                    <button onClick={handleClick2} className="btn btn-primary mr-2">
                      <img src={settingicon} alt=' ' className='h-1 w-1' />
                    </button>
                    <button onClick={handleClick} className="btn btn-primary  mr-5">Details</button>
                  </div>
                </div>
              </div>
              {index < 2 && <hr />}
            </div>
          ))}
          <div className="text-left mt-4">
            <button type="button" className="btn btn-primary">Create Wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallets;
