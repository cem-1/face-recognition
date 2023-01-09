import './App.css';
import Navigation from "./components/navigation/Navigation"
import 'tachyons'
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm"
import Rank from "./components/rank/Rank"
import React from 'react';
import Particles from "./components/particles/Particles"
import FaceRecognition from "./components/facerecognition/FaceRecognition"
import Signin from "./components/signin/Signin"
import Register from "./components/register/Register"

const initialState ={
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
}
}

class App extends React.Component {
  constructor(){
    super()
    this.state = initialState;
    }
  

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width-(clarifaiFace.right_col*width),
      bottomRow : height - (clarifaiFace.bottom_row*height),
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
  this.setState({imageUrl: this.state.input});
  
  fetch("http://localhost:4000/imageurl", {
    method: "post",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      input: this.state.input
    })
  })
  .then(response => response.text())
  .then(response => {
    const parser = JSON.parse(response);
    this.displayFaceBox(this.calculateFaceLocation(parser));
  }).catch(error => console.log('error', error));
  }

  onRouteChange = (route) =>{
    if(route === "signout") {
      this.setState(initialState) } 
      else if (route === "home"){
      this.setState({isSignIn: true})
      }
    this.setState({route: route});
  }
  
  render() {
  return (
    <div className="App">
    <Particles className="particles-css" />
    <Navigation isSignedIn={this.state.isSignIn} onRouteChange={this.onRouteChange}/>
    {this.state.route === "home" ? 
    <div>
    <Rank name={this.state.user.name} entries={this.state.user.entries} />
    <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} className="particles-js" />
    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
      : (
        this.state.route === "signin" ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      )}
    </div>
  );
}
}

export default App;
