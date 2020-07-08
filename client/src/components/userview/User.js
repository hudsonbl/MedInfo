import React from 'react'
import MedInfoItem from './MedInfoItem'

// Each one will be represented by a item accordian
// allergies
// doctor-visit
// chronic-health
// drug-prescription
// hospital-visit
// immunization-record
// lab-reportsnpm 
// first-responder

// TODO: Link uses navigate as a good way for using React Routes
// https://stackoverflow.com/questions/47282998/validatedomnesting-warning-react
/*
   TODO: Need to incorporate successStatus in list components
         Need to make query folder, incase you need to fetch another list, query functions will reduce
            code in their uses.
         Make URL's for fetch replaceable ie: (url) => {fetch (url)}
*/

// Component: User populates the screen with Medical Information. Each piece of information is known as a MedInfoItem.
class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.user.userId,
            bearerToken: this.props.user.bearerToken
        }
    } 

    render() {
       
        return (
            <div className="data-list">
                <MedInfoItem panel={'Allergies'} state={this.state}/>
                <MedInfoItem panel={'Doctor Visits'} state={this.state}/>
                <MedInfoItem panel={'Chronic Health Issues'} state={this.state}/>
                <MedInfoItem panel={'Drug Prescriptions'} state={this.state}/>
                <MedInfoItem panel={'Hospital Visits'} state={this.state}/>
                <MedInfoItem panel={'Immunization Records'} state={this.state}/>
                <MedInfoItem panel={'Lab Reports'} state={this.state}/>
            </div>
        ) 
    }
}

export default User