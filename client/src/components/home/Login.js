import React from "react"

// Logs a user into the website
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            bearerToken: "",
            userId: "",
            successStatus: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginPortal = this.loginPortal.bind(this)
    }

    // Logs a user in, DB checks if user is valid.
    loginPortal(event){
        event.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'accept': 'application/json'},
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
        }

        fetch(`http://localhost:6000/users/login`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                
                this.setState({
                    userId: data.userId, 
                    bearerToken: data.bearerToken, 
                    successStatus: data.successStatus
                });
            })
            .catch(error => {
                console.log(error)
                this.setState({successStatus: error.successStatus})
            });
    }
    // Handles user input in forms and updates state
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div> 
                <h1>Login Screen</h1>
                <form>
                    <input 
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="username"
                    />
                    <br />

                    <input 
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="password"
                    />
                    <br />

                    <button onClick={this.loginPortal}>Login</button>
                    <button onClick={() => this.props.setScreen('user', this.state)}>User</button>
                </form>
                {this.state.successStatus ? <h1>Bearer Token: {this.state.bearerToken}</h1> : <h1>No bearer token yet</h1>}
            </div>
        )
    }
}

export default Login