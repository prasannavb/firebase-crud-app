import React from 'react';
import './Form.css';

const Form = (props) => {
  const { HandleChange, Operation, formdata } = props;
  return (
    <div className="form">
      <input type="email"  className="input"  onChange={HandleChange}   name="email"  value={formdata.email}  placeholder="Enter your email"
        required
      />
      <input
        type="password"
        className="input"
        onChange={HandleChange}
        name="password"
        value={formdata.password}
        placeholder="Enter your password"
        required
      />
      <button className="button" onClick={Operation}>
        Submit
      </button>
    </div>
  );
};

export default Form;
