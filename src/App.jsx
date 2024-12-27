import React, { useState } from 'react';
import "./App.css";


const App = () => {

// State variable to manage options, errors, and generated password
const [options,setOptions] = useState({
  length: 10,
  lowercase: false,
  uppercase: false,
  number: false,
  symbols:false,
  isError: false,
});

const [isError, setError] = useState(false);
const [generatedPassword, setGeneratedPassword] = useState("");

// Function to select random password based on select

const generateRandomPassword = ()=>{

  if(
    !options?.uppercase &&
    !options?.lowercase &&
    !options?.number&&
    !options?.symbols
  ){
    setError(true);
    console.log("iam here");
    return;
  }
  
  setError(false);
  //Define the character
  const uppercaseChars ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars ="abcdefghijklmnopqrstuvwxyz";
  const numberChars ="01123456789";
  const symbolChars = '!@#$%^&*()_+-={}[]|:;"<>,.?/~';
  
  let passwordChars = "";
  let password = "";


if(options.uppercase){
  passwordChars += uppercaseChars;
}
if(options.lowercase){
  passwordChars += lowercaseChars;
}
if(options.number){
  passwordChars += numberChars;
}
if(options.symbols){
  passwordChars += symbolChars;
}

const passwordLength = options.length;

//Generate the random password

for(let i=0; i< passwordLength; i++){
  const randomIndex = Math.floor(Math.random() * passwordChars.length);

  password += passwordChars[randomIndex];
}

// update the generate password

setGeneratedPassword(password);
};
 

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <p className="title">Generate Random Password</p>
        </div>

        <div className="card-body">
          {/* Input field for password length */}
          <label>Password Length</label>
       
           <input 
              value={options.length}
              onChange={({target})=>{
                setOptions({...options, length: target.value});
              }}
              name="confirmPassword"
              type="number"
              placeholder="Password length"
              min={4}
            />
            {/* check box */}
            <div className="row">
              <div className="checkbox-container">
                <input type="checkbox" 
                    checked={options.uppercase}
                    onChange={()=>{
                      setOptions({...options, uppercase: !options.uppercase});
                    }}
                  />
                  <label>Uppercase</label>
              </div>

              {/* Lowercase checkbox */}

              <div className="checkbox-container">
                <input type="checkbox" 
                    checked={options.lowercase}
                    onChange={()=>{
                      setOptions({...options, lowercase: !options.lowercase});
                    }}
                  />
                  <label>Lowercase</label>
              </div>


            </div>

            {/* next row number, symbols */}

            <div className="row">
              <div className="checkbox-container">
                <input type="checkbox" 
                  checked={options.number}
                  onChange={()=>{
                    setOptions({...options, number:!options.number});
                  }}
                />
                <label>Number</label>
              </div>


              <div className="checkbox-container">
                <input type="checkbox"
                  checked={options.symbols}
                  onChange={()=>{
                    setOptions({...options, symbols: !options.symbols});
                  }}
                />
                <label>Symbols</label>
              </div>
            </div>

            {/* Error msg if no option are selected */}
            {isError &&(
              <span className="error">Please select at least one option</span>
            )}

            {/* Button */}
              <button className='btn' onClick={generateRandomPassword}>Generate Password</button>
        </div>
      </div>

      {/* Display the genrate password if available */}

      {generatedPassword &&(
        <div className="password">
          <label>Generated Password:</label>
          <p>{generatedPassword}</p>
        </div>
      )}
      
    </div>
  )
}

export default App
