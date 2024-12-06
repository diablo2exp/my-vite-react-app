import React, {useState} from "react";
import { Link } from 'react-router-dom';
import './Login.css';

function App() {
    const [, setUsername] = useState("");
    const [, setPassword] = useState("");
  
    function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
      const {name, value} = event.target;
      if (name === "username") {
        setUsername(value);
      } else if (name === "password") {
        setPassword(value);
      }
    };
    
    return (
      <div className="login-app-container">
        <div className="login-content">
          <div><span className="login-font-size4">My React App</span></div>
          <div><span className="login-font-size2">please input your ID and password</span></div>
          <div className="form-group">
              <div className="flex-center">
                  <div style={{width: '100px', textAlign: 'right'}}>
                      <label htmlFor="username">id :</label>
                  </div>
                  <div>
                      <input type="text" id="username" className="form-control" 
                      placeholder="Enter your ID" onChange={handleInputChange} />
                  </div>
              </div>
              <div className="flex-center">
                  <div style={{width: '100px', textAlign: 'right'}}>
                      <label htmlFor="password">password :</label>
                  </div>
                  <div>
                      <input type="password" id="password" className="form-control" 
                      placeholder="Enter your password" onChange={handleInputChange}/>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  };
  export default App;