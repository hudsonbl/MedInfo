import React from 'react'

function Home(props) {
    
    return(
        <div>
            <h1>This is a home page</h1>
            <button onClick={() => props.setScreen('create')}> Create User </button>
            <button onClick={() => props.setScreen('login')}> Login </button>
        </div>
    )
}

export default Home