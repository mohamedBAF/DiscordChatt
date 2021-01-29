import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import {auth,provider} from './firebase'
function Login() {

const signIn=(e)=>
{

auth.signInWithPopup(provider)
.catch(error=>alert(error.message))

}


  return (
    <div className="login">
      <div className="login__logo">
        <img src="https://www.01net.com/i/0/0/0ec0a8f/2d1e37aac7e9e7f1dbfd007f8.jpg" />
      </div>

      <Button onClick={signIn}>sign In</Button>
    </div>
  );
}

export default Login;
