import {Link} from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Register(){
    const [fullName,setfullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");
    const [cnfmPassword,setcnfmPassword] = useState("");



     const submitHandler= async (e)=> {
         e.preventDefault();
        try{
  const registerApi = await api.post('/auth/register',
              {
                name:fullName,
                email:email,
                password:password
              }
            );

           
                alert("register successfully")
                
            

                setEmail("");
                setPassword("");
                setcnfmPassword("");
                setfullName("");
        }
          catch(error){
                            console.log(error);          }
            
        }
    return (
       
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-heading">
                    <h2>
                        AI Document Q&A
                    </h2>
                    <h4>

                        Create Account
                    </h4>
                </div>
                <form className="auth-form" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="full-name">Full Name</label>
                        <input type="text" 
                        id="full-name" 
                        value={fullName} 
                        onChange={(e)=>setfullName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <input type="email" id="email"
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cnfm-password">Confirm Password</label>
                        <input type="password" id="cnfm-password"
                        value={cnfmPassword}
                        onChange={(e)=>setcnfmPassword(e.target.value)
                        }/>
                    </div>
                    <button className="primary-button" type="submit">Register</button>
                </form>
                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;