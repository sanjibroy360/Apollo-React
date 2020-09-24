import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Apollo from "./Apollo";


async function setToken(getToken) {
  let token = await getToken({});
  localStorage.setItem("accessToken", token);
}

function  App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently
  } = useAuth0();
 
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  
 
  if (isAuthenticated) {
    setToken(getAccessTokenSilently)
    
    return (
      <>
      <div>
        Hello {user.name}{' '}
        {console.log({user})}
        <button onClick={() => logout({ returnTo: "http://localhost:3000" })}>
          Log out
        </button>
        
      </div>
      <Apollo  /></>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}
 
export default App;
