import React from 'react';
import Logo from "../logo/Logo"

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
    return (
    <nav style={{display: "flex", justifyContent: "space-between"}}>
        <Logo style={{justifyContent: "flex-start"}}/>
        <p onClick={() => onRouteChange("signout")} style={{justifyContent: "flex-end"}} className="f3 link dim black underline pa3 pointer">Sign Out</p>
    </nav>
    )
    } else {
    return (
        <nav style={{ display: "flex", justifyContent: "space-between"}}>
            <Logo style={{justifyContent: "flex-start"}}/>
            <div style={{justifyContent: "flex-end"}}>
            <p onClick={() => onRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign In</p>
            <p onClick={() => onRouteChange("register")} className="f3 link dim black underline pa3 pointer">Register</p>
            </div>
        </nav>
        ) 
    }
}

export default Navigation;