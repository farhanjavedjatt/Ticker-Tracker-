
export const $ = document.querySelector.bind(document);

const API_BASE_URL = 'http://51.20.51.47:8080'; 

export async function _fetch(path, payload = '') {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
  };
  if (payload && !(payload instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(payload);
  }
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: headers,
      body: payload,
    });
    if (res.status === 200) {
      return res.json();
    } else {
      const result = await res.json();
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Fetch error:', path, error);
    throw error;
  }
};

export const base64url = {
  encode: function(buffer) {
    const base64 = window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  },
  decode: function(base64url) {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const binStr = window.atob(base64);
    const bin = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bin[i] = binStr.charCodeAt(i);
    }
    return bin.buffer;
  }
}

// TODO: Add an ability to create a passkey: Create the registerCredential() function.

export async function registerCredential(username_received, id_received) {

  // TODO: Add an ability to create a passkey: Obtain the challenge and other options from the server endpoint.
  const user = await _fetch('/auth/username', {username: username_received, id: id_received})

  console.log(user.id);

  const options = await _fetch('/auth/registerRequest', {id: user.id, username: user.username, displayName: user.displayName});

  console.log(options);

  // TODO: Add an ability to create a passkey: Create a credential.
  // Base64URL decode some values.
  options.user.id = base64url.decode(options.user.id);
  const original_challenge = options.challenge;
  options.challenge = base64url.decode(options.challenge);


  if (options.excludeCredentials) {
    for (let cred of options.excludeCredentials) {
      cred.id = base64url.decode(cred.id);
    }
  }
  // Use platform authenticator and discoverable credential.
  options.authenticatorSelection = {
    authenticatorAttachment: 'platform',
    requireResidentKey: true
  }
  // Invoke the WebAuthn create() method.
  const cred = await navigator.credentials.create({
    publicKey: options,
  });
  
  // TODO: Add an ability to create a passkey: Register the credential to the server endpoint.

  const credential = {};
  credential.id = cred.id;
  credential.rawId = cred.id; // Pass a Base64URL encoded ID string.
  credential.type = cred.type;

  // The authenticatorAttachment string in the PublicKeyCredential object is a new addition in WebAuthn L3.
  if (cred.authenticatorAttachment) {
    credential.authenticatorAttachment = cred.authenticatorAttachment;
  }

  // Base64URL encode some values.
  const clientDataJSON = base64url.encode(cred.response.clientDataJSON);
  const attestationObject = base64url.encode(cred.response.attestationObject);

  // Obtain transports.
  const transports = cred.response.getTransports ? cred.response.getTransports() : [];

  credential.response = {
    clientDataJSON,
    attestationObject,
    transports
  };

  // return await _fetch('/auth/registerResponse', credential);
  return await _fetch('/auth/registerResponse', {
    credential,
    user,
    original_challenge
  });
};

// TODO: Add an ability to authenticate with a passkey: Create the authenticate() function.

export async function authenticate() {

  // TODO: Add an ability to authenticate with a passkey: Obtain the challenge and other options from the server endpoint.

  const options = await _fetch('/auth/signinRequest');

  // TODO: Add an ability to authenticate with a passkey: Locally verify the user and get a credential.

  // Base64URL decode the challenge.
  const original_challenge = options.challenge;
  options.challenge = base64url.decode(options.challenge);

  // An empty allowCredentials array invokes an account selector by discoverable credentials.
  options.allowCredentials = [];

  // Invoke the WebAuthn get() method.
  const cred = await navigator.credentials.get({
    publicKey: options,
    // Request a conditional UI
    // mediation: 'conditional'
  });

  // TODO: Add an ability to authenticate with a passkey: Verify the credential.

  const credential = {};
  credential.id = cred.id;
  credential.rawId = cred.id; // Pass a Base64URL encoded ID string.
  credential.type = cred.type;

  // Base64URL encode some values.
  const clientDataJSON = base64url.encode(cred.response.clientDataJSON);
  const authenticatorData = base64url.encode(cred.response.authenticatorData);
  const signature = base64url.encode(cred.response.signature);
  const userHandle = base64url.encode(cred.response.userHandle);

  credential.response = {
    clientDataJSON,
    authenticatorData,
    signature,
    userHandle,
  };

  const user = await _fetch(`/auth/signinResponse`, {credential, original_challenge});

  console.log("USER: ", user);

  return user;
};

export async function updateCredential(credId, newName, id) {
  return _fetch(`/auth/renameKey`, { credId, newName, id });
}

export async function unregisterCredential(credId, user_id) {
  return _fetch(`/auth/removeKey?credId=${encodeURIComponent(credId)}?userId=${encodeURIComponent(user_id)}`);
};
