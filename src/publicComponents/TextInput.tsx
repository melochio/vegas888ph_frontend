import React from 'react';

const TextInput = ({ label, placeholder }:{label:string,placeholder:string}) => {
    const TextStyle = {
        padding:'8px',
    }
  return (
    <div className="form-group" style={{display:'flex', flexDirection:'column', padding:'10px'}}>
      <label htmlFor="textInput" className="form-label">{label}</label>
      <input
        style={TextStyle}
        type="text"
        className="form-control"
        id="textInput"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;