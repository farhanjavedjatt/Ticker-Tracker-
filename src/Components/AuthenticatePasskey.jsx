import React from 'react';
import { authenticate } from '../assets/client'; // Adjust the path as needed

const AuthenticatePasskey = () => {
  const handleAuthenticate = async () => {
    try {
      await authenticate();
      alert('Authenticated successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleAuthenticate}>Authenticate with Passkey</button>
    </div>
  );
};

export default AuthenticatePasskey;
