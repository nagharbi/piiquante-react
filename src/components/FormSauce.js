import React, { useRef } from "react";

export default function FormSauce(props) {
  const imputImg = useRef();
  const imgvue = useRef();
  const handleChange = (e) => {
    console.log(e.target.files);
    getBase64(e.target.files[0]);
  };
  const handleClick = () => {
    imputImg.current.click();
  };

  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      imgvue.current.src = reader.result;
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="manufacturer">Manufacturer</label>
        <input
          type="text"
          className="form-control"
          id="manufacturer"
          name="manufacturer"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="5"
        ></textarea>
      </div>
      <div className="form-group">
        <input
          ref={imputImg}
          onChange={handleChange}
          type="file"
          accept="image/*"
        />
        <button onClick={handleClick} color="primary">
          ADD IMAGE
        </button>
        <img
          ref={imgvue}
          src="imagePreview"
          style={{ maxHeight: "100px", display: "block", marginTop: "10px" }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="main-pepper">Main Pepper Ingredient</label>
        <input
          type="text"
          className="form-control"
          id="main-pepper"
          name="mainPepper"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="heat">Heat</label>
        <div className="heat-container">
          <input
            type="range"
            className="custom-range heat-range"
            min="1"
            max="10"
            id="heat"
            name="heat"
          />
          <input type="number" className="form-control heat-reading" disabled />
        </div>
      </div>
      <button color="primary">SUBMIT</button>
    </form>
  );
}
