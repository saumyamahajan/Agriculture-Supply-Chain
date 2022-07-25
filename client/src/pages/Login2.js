import React from "react";
import { Link } from 'react-router-dom';
import { useParams, Navigate, useNavigate} from "react-router-dom";
import { useState} from 'react';
// import { Alert } from 'react-alert'



const Login = () => {

    const navigate = useNavigate();
    const { type } = useParams();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    //const [state, setState] = useState('')
    //const [user, setUser] = useState([]);
    const [user,setUser] = useState({
      _id:'',
      userName: "",
      email: "",
      password: "",
      type: ""
    });

    const handleSubmit = async (e) => {
       e.preventDefault();
       // setSubmitted(true);
        //console.log(userName);
        //console.log(email);
        //console.log(passward);
       //console.log(userName);
      // const userDetails = {
      //     email : email,
      //     password : password,
      // }
 
      // await fetch('/api/user/login', {
      //   method: 'POST',
      //     headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(userDetails),
      //     })
      //     //.then(res => console.log(res[0]));
      //     .then(res => res.json())
      //       .then(res => {
      //           console.log(res[0]);
      //           setUser(res[0]); 
      //           // setUser(previousState => {
      //           //   return { ...previousState, userName : userName,
      //           //     email : email,
      //           //     passward : passward, type:type }
      //           // });
      //           //setUserName(res[0].userName)
      //       })
          const {_id,userName ,email,type}=user;
        console.log("user id:"+_id); 
        console.log("uname:"+ userName);
        console.log("uemail:"+email);
        //console.log(user[0]);
        
        // sessionStorage.setItem("userName", userName);
        // sessionStorage.setItem("email", email);
        // sessionStorage.setItem("passward", passward);
        // sessionStorage.setItem("userType", type);

   

        // not working
        // {<Navigate replace to="/farmer" />}
        navigate('/farmer');
    }

    const handleUserName = (e) => {
      setUserName(e.target.value);
     
    };

// Handling the email change
const handleEmail = (e) => {
  setEmail(e.target.value);
 
};

// Handling the password change
const handlePassword = (e) => {
  setPassword(e.target.value);
 
};


    return (
      <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
      <div >
          
      <form>
      <div className="form-group" >
          <input type="text"   id="userName"  placeholder="username"   onChange={handleUserName} value={userName}/>
        </div>
        <div className="form-group" >
          <input type="text"   id="email"  placeholder="email"   onChange={handleEmail} value={email}/>
        </div> <br></br>
        <div className="form-group">
          <input type="text"  id="Password" placeholder="Password" value={password}
            onChange={handlePassword}/>
        </div>
        <br></br>
        <div className="form-group">
          <button className="btn btn-primary" onClick={handleSubmit}> Submit</button>
          <button className="btn btn-danger"> Register </button>
        </div>
      </form> 


    </div>
  </div>
    )

}

export default Login 