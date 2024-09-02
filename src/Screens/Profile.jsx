import { useEffect, useState, useContext } from "react";
import { auth, db } from "../firebaseConfig"; // Make sure to import Firebase config
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import "../Win95.css";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import {
  $,
  _fetch,
  registerCredential,
  unregisterCredential,
  updateCredential
} from '../assets/client';

async function reauthenticateUser(currentPassword) {
  if (auth.currentUser) {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      return true;
    } catch (error) {
      alert("Re-authentication failed. Please check your password.");
      return false;
    }
  }
  return false;
}

function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [id, setID] = useState("")
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email);
        fetchUserData(user.uid);
      } else {
        setUser(null);
        setUsername("");
        setEmail("");
      }
    });

    renderCredentials();

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    const userDoc = doc(db, "users", uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      setUsername(docSnap.data().username);
      setID(docSnap.id);
    }
  };

  async function updateUsername(newUsername) {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userDocRef, {
          username: newUsername
        });
        console.log("Username updated successfully");
      } catch (error) {
        console.error("Error updating username:", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  }

  async function handleChangeUsername() {
      const newPassword = prompt("Please enter your new username:");
      if (newPassword) {
        try {
          await updateUsername(newPassword);
          alert("Username changed successfully.");
        } catch (error) {
          alert("Failed to change username: " + error.message);
        }
      } else {
        alert("New username entry canceled.");
      }
    }

  async function handleChangePassword() {
    const currentPassword = prompt("Please enter your current password:");
    if (currentPassword) {
      const isReauthenticated = await reauthenticateUser(currentPassword);
      if (isReauthenticated) {
        const newPassword = prompt("Please enter your new password:");
        if (newPassword) {
          try {
            await updatePassword(auth.currentUser, newPassword);
            alert("Password changed successfully.");
          } catch (error) {
            alert("Failed to change password: " + error.message);
          }
        } else {
          alert("New password entry canceled.");
        }
      }
    } else {
      alert("Current password entry canceled.");
    }
  };  

  async function handleChangePin() {
    const user = auth.currentUser;
    if (user) {
      const currentPinEntered = prompt("Please enter your current PIN:");
      if (currentPinEntered) {
        // Fetch the user's document from Firestore
        const userDocRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists() && docSnap.data().pin === currentPinEntered) {
            const newPin = prompt("Please enter your new PIN:");
            if (newPin) {
              try {
                await updateDoc(userDocRef, {
                  pin: newPin
                });
                setNewPin(newPin); // Update the state if needed
                alert("PIN changed successfully.");
              } catch (error) {
                alert("Failed to change PIN: " + error.message);
              }
            } else {
              alert("New PIN entry canceled.");
            }
          } else {
            alert("Incorrect current PIN.");
          }
        } catch (error) {
          alert("Error fetching user data: " + error.message);
        }
      } else {
        alert("Current PIN entry canceled.");
      }
    } else {
      console.error("User is not authenticated");
    }
  }

  const handleBiometricToggle = (enable) => {
    setBiometricEnabled(enable);
    // Add logic to enable/disable biometric authentication
  };

  async function handlePinToggle(enable) {
    const user = auth.currentUser;
    if (user) {
      if (enable) {
        const newPin = prompt("Please enter your new PIN:");
        if (newPin) {
          try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
              pin: newPin,
              pinEnabled: true
            });
            setPinEnabled(true);
            alert("PIN set and enabled successfully.");
          } catch (error) {
            alert("Failed to set PIN: " + error.message);
          }
        } else {
          alert("PIN entry canceled.");
        }
      } else {
        const currentPin = prompt("Please enter your current PIN to disable:");
        if (currentPin) {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists() && docSnap.data().pin === currentPin) {
            try {
              await updateDoc(userDocRef, {
                pin: "",
                pinEnabled: false
              });
              setPinEnabled(false);
              alert("PIN disabled successfully.");
            } catch (error) {
              alert("Failed to disable PIN: " + error.message);
            }
          } else {
            alert("Incorrect PIN.");
          }
        } else {
          alert("PIN entry canceled.");
        }
      }
    } else {
      console.error("User is not authenticated");
    }
  }

  async function renderCredentials() {
    const user = await _fetch('/auth/username', {username: username})
    
    console.log(user);

    const res = await _fetch('/auth/getKeys', {id: user.id, username: user.username, displayName: user.displayName});

    console.log(res);

    const list = document.getElementById('list');
  
    let credsHTML = '';
  
    if (res.length > 0) {
      credsHTML = '<ul class="list-group">';
      credsHTML += res.map(cred => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${cred.name || 'Unnamed'}</span>
          <div>
            <button class="btn btn-primary btn-warning mr-2" data-cred-id="${cred.id}" data-name="${cred.name || 'Unnamed'}">
              Edit
            </button>
            <button class="btn btn-primary btn-danger" data-cred-id="${cred.id}">
              Delete
            </button>
          </div>
        </li>`
      ).join('');
      credsHTML += '</ul>';
    } else {
      credsHTML = '<ul class="list-group"><li class="list-group-item">No credentials found.</li></ul>';
    }
  
    list.innerHTML = credsHTML;
    document.querySelectorAll('button[data-cred-id]').forEach(button => {
      button.addEventListener('click', button.classList.contains('btn-danger') ? remove : rename);
    });
  };

  async function register() {
    try {
      await registerCredential(username, id);
    } catch (e) {
      // An InvalidStateError indicates that a passkey already exists on the device.
      if (e.name === 'InvalidStateError') {
        alert('A passkey already exists for this device.');
      // A NotAllowedError indicates the user canceled the operation.
      } else if (e.name === 'NotAllowedError') {
        return;
      // Show other errors in an alert.
      } else {
        alert(e.message);
        console.error(e);
      }
    }
  }

  const rename = async (event) => {
    const credId = event.target.getAttribute('data-cred-id');
    const newName = prompt('Enter new name for the credential:'); // Example way to get the new name

    if (!newName) {
      return; // Exit if no new name is provided
    }

    try {
      // Replace this with your actual renaming logic
      await updateCredential(credId, newName, id);
      console.log(`Credential with ID: ${credId} renamed to: ${newName}`);
    } catch (e) {
      // Handle specific errors if necessary
      alert(`Error renaming credential: ${e.message}`);
      console.error(e);
    }
  };

  const remove = async (event) => {
    const credId = event.target.getAttribute('data-cred-id');
    const confirmRemoval = window.confirm('Are you sure you want to remove this credential?');

    if (!confirmRemoval) {
      return; // Exit if removal is not confirmed
    }

    try {
      console.log(credId, id);
      await unregisterCredential(credId, id);
      // console.log(`Credential with ID: ${credId} removed.`);
    } catch (e) {
      // Handle specific errors if necessary
      alert(`Error removing credential: ${e.message}`);
      console.error(e);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ backgroundColor: "teal", padding: "20px", color: "white" }}
    >
      <div className="row">
        <div className="col-md-6">
          <div className="card custom-card-width square">
            <div className="card-header w95">
              <h4 className="my-0 font-weight-normal text-center">
                Profile Information
              </h4>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail1"
                    className="col-sm-4 col-form-label"
                  >
                    Email:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="email"
                      className="form-95"
                      id="inputEmail1"
                      value={email}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputUsername"
                    className="col-sm-4 col-form-label"
                  >
                    Username:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-95"
                      id="inputUsername"
                      value={username}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row mt-2 ">
                  <div className="col-sm-12 text-center">
                    <button
                      type="button"
                      className="btn btn-primary mr-2"
                      onClick={() => handleChangeUsername()}
                    >
                      Change Username
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-4">
                <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card custom-card-width square">
            <div className="card-header w95">
              <h4 className="my-0 font-weight-normal text-center">
                Account Security
              </h4>
            </div>
            <div className="card-body">
              <div>
                <div className="form-group row">
                  <label
                    htmlFor="inputChangePassword"
                    className="col-sm-4 col-form-label"
                  >
                    Change Password:
                  </label>
                    <button
                      type="button"
                      className="btn btn-primary mr-2"
                      onClick={() => handleChangePassword()}
                    >
                      Change Password
                    </button>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="inputChangePassword"
                    className="col-sm-4 col-form-label"
                  >
                    Change PIN:
                  </label>
                  <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleChangePin()}
                    >
                      Change PIN
                    </button>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputChangePassword"
                    className="col-sm-4 col-form-label"
                  >
                    Biometric Authentication:
                  </label>
                  <div className="col-sm-8">
                    <fieldset className="form-group">
                      <div className="row">
                        <div className="col-sm-10 d-flex flex-row">
                          <div className="form-check mr-3">
                            <input
                              className="form-check-input mt-2"
                              type="radio"
                              name="biometricRadios"
                              id="enableBiometric"
                              checked={biometricEnabled}
                              onChange={() => handleBiometricToggle(true)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="enableBiometric"
                            >
                              Enable
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="biometricRadios"
                              id="disableBiometric"
                              checked={!biometricEnabled}
                              onChange={() => handleBiometricToggle(false)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="disableBiometric"
                            >
                              Disable
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPin" className="col-sm-4 col-form-label">
                    Pin:
                  </label>
                  <fieldset className="form-group">
                    <div className="row pl-3">
                      <div className="col-sm-10 d-flex align-items-center">
                        <div className="form-check mr-3 d-flex align-items-center">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="pinRadios"
                            id="enablePin"
                            checked={pinEnabled}
                            onChange={() => handlePinToggle(true)}
                          />
                          <label
                            className="form-check-label ml-2"
                            htmlFor="enablePin"
                          >
                            Enable
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="pinRadios"
                            id="disablePin"
                            checked={!pinEnabled}
                            onChange={() => handlePinToggle(false)}
                          />
                          <label
                            className="form-check-label ml-2"
                            htmlFor="disablePin"
                          >
                            Disable
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="form-group row">
                <label
                    htmlFor="inputChangePassword"
                    className="col-sm-4 col-form-label"
                  >Passkeys:
                  </label>
                  <button className="btn btn-primary" onClick={() => register()}>Create Passkey</button>
                  <button className="btn btn-primary ml-2" onClick={() => renderCredentials()}>Show Registered Passkeys</button>
                </div>
                <h3 className="mt-4">Your registered passkeys:</h3>
                <br />
                <div id="list"></div>
                <p id="message" className="instructions"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
