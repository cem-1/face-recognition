import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
         <div>
            <p className="f3">
                {"Lets run the machine to detect faces in your pictures."}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input onChange={onInputChange} className="f4 pa2 w-70 whitebox center" type="text"/>
                    <button onClick={onButtonSubmit} className="b--none w-30 grow f4 link ph3 pv2 dib white bg-dark-green">Detect</button>
                </div>
            </div>
         </div>
    )
}

export default ImageLinkForm;