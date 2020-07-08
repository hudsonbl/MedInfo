import React from "react"

// This class handles creating a user to the website
// TODO: When I add QR code may need to add qr state or what not
class CreateUser extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: "",
            email: "",
            password: "",
            errorMessage: "",
            successStatus: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.createUser =  this.createUser.bind(this)
    }

    // Client makes POST request to DB
    createUser(event) {
        event.preventDefault()
        // Request Body
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'accept': 'application/json'},
            body: JSON.stringify({
              name: this.state.name,
              email: this.state.email,
              password: this.state.password
            })
        }
        // Fetch request
        fetch(`http://localhost:6000/users`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                // If successful, successStatus == true
                this.setState({successStatus: data.successStatus});
            })
            .catch(error => {
                this.setState({errorMessage: error.error, successStatus: error.successStatus})
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
                <h1>Create a User: </h1>
                <form>
                    <input 
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Enter Name"
                    />
                    <br />

                    <input 
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Enter Email"
                    />
                    <br />

                    <input 
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Enter Password"
                    />
                    <br />

                    <button onClick={this.createUser}>Create User</button>
                    
                </form>
                {this.state.successStatus ? <button onClick={() => this.props.setScreen('login')}>Login Screen</button> : <h2>User has yet to create user successfully yet</h2>}
            </div>
        )
    }
}

export default CreateUser 