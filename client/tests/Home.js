import React from 'react'

function Home(props) {
    const path = {
        path: '/test',
        pathName: 'create'
    }
    return(
        <div>
            <h1>This is a home page</h1>
            <button onClick={() => props.setScreen(path.pathName)}> Test Screen </button>
        </div>
    )
}

export default Home