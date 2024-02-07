import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "./index.scss";

const Modal = ({ isOpen, closeModal, onSubmit, portfolio, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editedData, setEditedData] = useState({
    name: portfolio ? portfolio.name : "",
    description: portfolio ? portfolio.description : "",
    image: portfolio ? portfolio.image : "",
    url: portfolio ? portfolio.url : "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors({ ...formErrors, [name]: "" }); // Clear validation error on input change
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation before submitting
    const errors = {};
    if (!editedData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!editedData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!selectedFile) {
      errors.image = "Image is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      onSubmit(editedData);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    setEditedData({
      name: portfolio ? portfolio.name : "",
      description: portfolio ? portfolio.description : "",
      image: portfolio ? portfolio.image : "",
      url: portfolio ? portfolio.url : "",
    });
    setFormErrors({});
    setSelectedFile(null);
  }, [portfolio]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      ariaHideApp={false}
      style={customStyles}
    >
      <button className="close-button" onClick={closeModal}>
        X
      </button>
      <div className="modal-container">
        <h1>Edit Portfolio Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <p className="error">{formErrors.name}</p>}
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={editedData.description}
              onChange={handleInputChange}
            />
            {formErrors.description && (
              <p className="error">{formErrors.description}</p>
            )}
          </div>

          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formErrors.image && <p className="error">{formErrors.image}</p>}
          </div>

          <div className="form-group">
            <label>URL:</label>
            <input
              type="text"
              name="url"
              value={editedData.url}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </ReactModal>
  );
};

export default Modal;
