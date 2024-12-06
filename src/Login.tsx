
import React, {useState} from "react";
import './Login.css';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    isLoading?: boolean | false;
    username?: String | "";
    password?: String | "";
    errorMessage?: String | "";
    currentTime?: String | "";
}

class LoginButton extends React.Component<{}, LoginProps>{
    constructor(props: {}) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = { 
            isLoading: false,
            username: "",
            password: "",
            errorMessage: ""
        };
    }

    handleClick = () => {

        console.log("Login button clicked");
        this.setState({isLoading: true, errorMessage: ""});

        // This probably where you would have an `ajax` call
        //setTimeout(() => {
        // Completed of async action, set loading state back
        //this.setState({isLoading: false});
        //}, 2000);

        const {username, password} = this.state;
        const navigate = useNavigate();

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
       .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login failed, please try again');
            }
        })
       .then(data => {
            console.log(data);
            navigate('/main');
       })
       .catch(error => {
            console.error(error);
            this.setState({errorMessage: error.message,isLoading: false});
        })
        .finally(() => {
            this.setState({isLoading: false});
        });
    }


    render() {
        let isLoading = this.state.isLoading;
        return (
            <Button
                variant="primary"
                className="login-button"
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick : void 0}>
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
        );
    }
}

class CurrentTime extends React.Component<{}, LoginProps> {
    private intervalId: any;
    constructor(props: {}) {
        super(props);
        this.state = { currentTime: new Date().toLocaleString()};
    }
    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({currentTime: new Date().toLocaleString()});
        }, 1000);   
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <span>{this.state.currentTime}</span>
        );
    }
}


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
            <div>
                <LoginButton />
            </div>
        </div>
        {/*}
        <div className="flex-center">
            <div>
                <Link to="/register">Register</Link>
            </div>
            <div>
                <Link to="/forgot-password">Forgot Password</Link>
            </div>
        </div>
        {*/}
      </div>
      <div className="flex-center">
        <Card className='login-notice-card'>
            <Card.Title className='login-notice-title'>Notice</Card.Title>
            <Card.Body>
                have a good day! welcome to my app! the current time is <CurrentTime />.
            </Card.Body>
        </Card>
        </div>
    </div>
  );
};
export default App;