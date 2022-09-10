import React from 'react'
import Output from './Output'

function Home() {
    return (
        <div className='home'>
            <div id='titleLogo' onClick={() => {
                window.location.reload(true);
            }}>
                <img id='dictionaryLogo' src={require('../images/dictionaryLogo.png')} alt='dictionary with magnifying glass' />
                <h1><span>your</span>Dictionary</h1>
                <h3>by AroxDev</h3>
            </div>
            <div className='info'>
                <Output />
            </div>
        </div>
    )
}

export default Home