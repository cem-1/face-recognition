import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import process from './logo.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
        <Tilt className="br2 shadow-2 Tilt" style={{ height: '100px', width:"100px"}}>
            <div style={{ height: '100px', width:"100px",  }}>
                <div className = "pa3" ><img style={{paddingTop: "2px"}}alt="logo" src={process}/></div>
            </div>
        </Tilt>
        </div>
    )
}

export default Logo;