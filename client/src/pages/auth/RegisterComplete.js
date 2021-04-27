import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName,SetFirstName]=useState("");
  const [lastName,SetlastName]=useState("");
  const [mobile,setMobile]=useState("");
  const [pin,setPin]=useState("");
  const [po,setPo]=useState("");
  const [teh,setTeh]=useState("");
  const [dist,setDist]=useState("");
  const [id,setId]=useState("");
  const [state,setState]=useState("");
  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password||!firstName||!lastName||!mobile) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token,firstName,lastName,mobile,pin,po,teh,dist,state,id)
          .then((res) => {
            console.log('suraj',res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
               firstname: firstName,
               lastname:lastName,
               mobile:mobile,
               pin:pin,
               po:po,
               teh:teh,
               dist:dist,
               state:state,
               id:id,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <input type="email" className="form-control " value={email} disabled />
     
     <input type="text"  className="form-control" placeholder="First Name"onChange={(e) => SetFirstName(e.target.value)} autoFocus />
    
      

      
      <input type="text" className="form-control" onChange={(e) => SetlastName(e.target.value)} placeholder="Last Name" />

      
      
      <input type="" className="form-control p-2" onChange={(e) => setPin(e.target.value)} placeholder="Pin Code"/>
       <input type="" className="form-control p-2" onChange={(e) => setPo(e.target.value)} placeholder="Post Office"/>
       <input type="" className="form-control  p-2" onChange={(e) => setTeh(e.target.value)} placeholder="Tehsil"/>
       <input type="" className="form-control  p-2" onChange={(e) => setDist(e.target.value)} placeholder="District/City"/>
       <input type="" className="form-control p-2" onChange={(e) => setState(e.target.value)} placeholder="State"/>
       <input type="" className="form-control p-2" onChange={(e) => setMobile(e.target.value)} placeholder="Mobile"/>
       <input type="" className="form-control p-2" onChange={(e) => setId(e.target.value)} placeholder="Id Number"/>
 
 
 
       <input
         type="password"
         className="p-2 form-control"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="Password"
         
       />
    
      <br />
      <button type="submit" className="btn btn-raised p-2">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
