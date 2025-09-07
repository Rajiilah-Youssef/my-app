import { useState } from 'react';
import Input from "./Input";

export default function Validation() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ''})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {}

    // Basic validation
    if(!formData.firstName) newErrors.firstName = 'First Name is required';
    if(!formData.lastName) newErrors.lastName = 'Last Name is required';
    if(!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone Number must be 10 digits";
    if(!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Form is valid
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`)
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    });

    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Details</h2>
      <div className="control-row">
        <Input label="First Name" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
        <Input label="Last Name" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
        <Input label="Phone Number" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
        <Input label="Email" id="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
      </div>
      <p className="form-actions">
        <button className='button button-flat' type="button" onClick={handleReset}>Reset</button>
        <button className='button' type="submit">Validation</button>
      </p>
    </form>
  );
}
