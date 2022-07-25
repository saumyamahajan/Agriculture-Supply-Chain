import { useState } from 'react';
 
export default function Login() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  // const [user,setUser] = useState({
  //   _id:'',
  //   userName: "",
  //   userType: "",
  //   email: "",
  //   password: ""
   
  // });
  const [user,setUser] = useState({});

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);  
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    //setUser({ ...user, name: e.target.value }) 
    setPassword(e.target.value);   
  };
 
  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email,password);

       const userDetails = {
          email : email,
          password : password,
      }

         await fetch('/api/user/login', {
        method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userDetails),
          })
          .then(res => res.json())
            .then(res => {
                console.log(res[0]._id);
                //setUser(res[0]); 
                sessionStorage.setItem("_id", res[0]._id);
                //setUser({userName:res[0].userName, _id:res[0]._id}) 
                // setUser(previousState => {
                //   return { ...previousState, userName : userName,
                //     email : email, passward : password, userType:userType ,_id:_id
                //   }
                // });
                //setUserName(res[0].userName)
                
            })

            //const {_id,userName ,userType} = user;
            console.log("id:"+sessionStorage.getItem("_id"))
           ///user.map(item =>   console.log("_id:"+item._id))
           
  };
 
 
 
  return (

    <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
    {sessionStorage.getItem("_id").length >0 && 
      <h1>{sessionStorage.getItem("_id")}</h1>
    }

    <div className="form">
    
    
      <form>
      
        {/* <label className="label">Email</label> */}
        <input onChange={handleEmail} className="input" value={email} type="email" />
   <br></br>
        {/* <label className="label">Password</label> */}
        <input onChange={handlePassword} className="input" value={password} type="password" />
 <br></br>
        <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}
 