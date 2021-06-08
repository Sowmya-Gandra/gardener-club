import React from "react";
import {render} from "react-dom";

class Login extends React.Component {
  constructor(props) {
  super(props);
  this.state = {email:"",password:""};
  }

  updateEmail(event) {
    this.setState({email:event.target.value});
  }

  updatePass(event) {
    this.setState({password:event.target.value});
  }

  loginClick() {
    let that = this;
    console.log("Button pressed");
    fetch("./login", {
    method: "POST",
    headers: {
    "Content-type": "application/json",
    },
    body: JSON.stringify({
    email: that.state.email,
    password: that.state.password,
    }),
    })
    .then(function (response) {
    console.log(
    "Request status code: ",
    response.statusText,
    response.status,
    response.type
    );
    if (response.ok) {
    return response.json(); // a promise
    } else {
    let info = `Status code: ${response.status}, ${response.statusText}`;
    console.log(response);
   return Promise.reject(info); //rejected promise!
  }
   })
   .then(function (userInfo) {
   that.props.setRole(userInfo.role, userInfo);
   console.log(userInfo);
   })
  .catch(function (info) {
   console.log(info);
   that.props.setRole("guest", null);
   });
  }

render(){
return( <section>
  {<div>
   <h1>Login</h1>
   <form action=" " method ="get" className="logindetails">
     <div classNamme="logindetails">
         <label for="email">Email: </label>
         <input type="email" name="email" id="email" required />
         <label for="password">Password: </label>
         <input type="password" name="password" id="password" required/>  
         <input type="submit" value="login"/>
     </div></form>
     </div>}

</section>);
 }
}
export default Login;