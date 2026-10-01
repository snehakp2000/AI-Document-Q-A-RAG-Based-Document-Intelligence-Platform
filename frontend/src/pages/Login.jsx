import {useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../services/api";



function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
 const loginApi =await api.post('/auth/login',{
            email:email,
            password:password
        })

      
            console.log(loginApi);

            alert("login successful");

            localStorage.setItem("token",loginApi.data.token);

            Navigate('/dashboard');
    
        }
        catch(err){
            console.log(err);
        }
       
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
         <div className="auth-heading">
            <h2>AI Document Q&A</h2>
            <h4>Welcome Back!</h4>
         </div>
         <div>
            <div className="auth-form">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    
                    <button className="primary-button" type="submit">Login</button>
                    
                </form>
                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                </div>
            </div>
         </div>
         </div>
        </div>
    )
}

export default Login;
