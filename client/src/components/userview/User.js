import React from 'react'

// Each one will be represented by a item drawer
// allergies
// doctor-visit
// chronic-health
// drug-prescription
// hospital-visit
// immunization-record
// lab-reports
// first-responder

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.user.userId,
            bearerToken: this.props.user.bearerToken,
            buttons: {
                allergies: false,
                doctorvisit: false,
                chronichealth: false,
                drugprescription: false,
                hospitalvisit: false,
                immunizationrecord: false,
                labreports: false
            }
        }
    } 

    // Opens the buttonPressed item drawer. Closes the rest if any else are open.
    openItem(buttonPressed){
        for(const button in this.state.buttons) {
            if(buttonPressed != button){
                let buttons = { button: false}
                this.setState({
                    [buttons]: false 
                })
            } else {
                let buttons = { button: true}
                this.setState({
                    [buttons]: false 
                })
            }
        }
    }

    render() {
        return (
            <div className="data-items">
                
            </div>
        ) 
    }
}

export default User