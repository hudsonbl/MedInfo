import React from 'react'

function Test(props) {
    const path = {
        path: '/',
        pathName: 'home'
    }
    return(
        <div>
            <h1>This is a test page</h1>
            <button onClick={() => props.setScreen(path.pathName)}> Home Screen </button>
        </div>
    )
}

export default Test