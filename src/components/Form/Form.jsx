import { useState } from 'react';
import './Form.css';
import iconInfo from '../../assets/Images/icon-info.svg';
import iconUpload from '../../assets/Images/icon-upload.svg';

export default function Form(props) {
  const { onFormSubmit } = props;

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  //Handle Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    image: null
  });
  //Allows formData state to be updated dynamically
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  //Validate Form  has Input & Email 
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.username) newErrors.username = 'GitHub Username is required';
    return newErrors;
  };

  //Handle Submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onFormSubmit(formData);
      setFormData({
        name: '',
        email: '',
        username: '',
        image: null
      });
      setErrors({});
    }
  };

  //Handle File Upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.result
      }));
    };
    reader.readAsDataURL(file);
  };
  
  //Click to add
  const handleAvatarClick = () => {
    document.getElementById('fileInput').click();
  };

  //Delete/Remove Image from State 
  const handleDelete = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null
    }));
  };

  //Prevents default bahviour which is needed , also indiates a dragging operation is occuring
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  //Indicates that Drag has stopped
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  //Prevents default and indicates the Drag operation has ended,Retrives new dropped file,creates new file reader instance,defines onload handler to update formData,
  //Finally reads file as data URL
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className='Form-container'>
      <form onSubmit={handleSubmit}>
        <div
          className={`avatar-container ${isDragging ? 'dragging' : ''}`}
          onClick={handleAvatarClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {formData.image ? (
            <div className='uploaded-image-container'>
              <div className='uploaded-image'>
                <img src={formData.image} alt='Uploaded' />
              </div>
              <div className='image-buttons'>
                <button type="button" onClick={handleDelete}>Remove Image</button>
                <button type="button" onClick={handleAvatarClick}>Change Image</button>
              </div>
            </div>
          ) : (
            <div className='empty-image-container'>
              <img src={iconUpload} alt='Upload Icon' />
              <p>Drag and Drop or Click to Upload</p>
            </div>
          )}
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <div className="upload-info">
          <img src={iconInfo} alt="" />
          <p>Upload your photo (JPEG or PNG, max-size: 500KB).</p>
        </div>

        <div className='Form-control'>
          <label htmlFor='name'>Full Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          {/* Conditional Rendering Error msg */}
          {errors.name && <small className='error-msg'><img src={iconInfo} alt='info icon' />{errors.name}</small>}
        </div>

        <div className='Form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='example@email.com'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className='error-msg'><img src={iconInfo} alt='info icon' />{errors.email}</small>}
        </div>

        <div className='Form-control'>
          <label htmlFor='username'>GitHub Username</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='@username'
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <small className='error-msg'><img src={iconInfo} alt='info icon' />{errors.username}</small>}
        </div>

        <button type='submit'>Generate My Ticket</button>
      </form>
    </section>
  );
}