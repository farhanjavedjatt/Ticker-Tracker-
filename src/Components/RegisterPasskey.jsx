import React from 'react';
import { registerCredential } from '../assets/client'; // Adjust the path as needed

const RegisterPasskey = () => {
  const handleRegister = async () => {
    try {
      await registerCredential();
      alert('Passkey registered successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleRegister}>Register Passkey</button>
    </div>
  );
};

export default RegisterPasskey;
