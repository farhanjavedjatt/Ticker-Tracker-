import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Profile from "./Screens/Profile";
import Wallets from "./Screens/Wallet";
import WalletDetails from "./Screens/WalletDetails";
import ManualInvestments from "./Screens/Investments";
import NotificationCenter from "./Screens/Notifications";
import Logout from "./Screens/Logout";
import Splash from './Screens/Splash';
import Autoinvestment from './Screens/Autoinvestment';
import NotiSettings from './Screens/NotiSettings';
import { AuthProvider } from './AuthContext'; // Ensure the correct path and file extension
import ProtectedRoute from './Components/ProtectedRoute'; // Ensure the correct path and file extension

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/home" element={<Logout />} /> */}
          <Route path="/home" element={<ProtectedRoute key="home" element={<Profile />} />} />
          <Route path="/wallet" element={<ProtectedRoute key="wallet" element={<Wallets />} />} />
          <Route path="/details" element={<ProtectedRoute key="details" element={<WalletDetails />} />} />
          <Route path="/investment" element={<ProtectedRoute key="investment" element={<ManualInvestments />} />} />
          <Route path="/notifications" element={<ProtectedRoute key="notifications" element={<NotificationCenter />} />} />
          <Route path="/Auto-investment" element={<ProtectedRoute key="auto-investment" element={<Autoinvestment />} />} />
          <Route path="/Noti-settings" element={<ProtectedRoute key="noti-settings" element={<NotiSettings />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
