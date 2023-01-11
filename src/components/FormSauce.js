import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSauce, getOneSauce, updateSauce } from "../services/sauces";

export default function FormSauce({ sauceId }) {
  const imputImg = useRef();
  const imgvue = useRef();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [sauce, setSauce] = useState({
    name: "",
    manufacturer: "",
    description: "",
    mainPepper: "",
    imageUrl: "",
    heat: 1,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    // console.log(e.target.files);
    if (e.target.files) {
      getBase64(e.target.files[0]);
      // pour envoyer le fichier à l'api
      setFile(e.target.files[0]);
    } else {
      // console.log(e.target.name, e.target.value);
      // let formSauce = {};
      // formSauce[e.target.name] = e.target.value;
      setSauce({
        ...sauce,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleClick = () => {
    imputImg.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sauce, file);
    try {
      if (sauceId) {
        await updateSauce(sauceId, sauce, file);
      } else {
        await createSauce(sauce, file);
      }
      navigate("/sauces");
    } catch (error) {
      console.error("Error occurred while submitting", error.message);
    }
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

  useEffect(() => {
    async function load(id) {
      if (id) {
        setPending(true);
        const data = await getOneSauce(id);
        setSauce(data);
        setPending(false);
      }
    }

    setPending(false);
    load(sauceId);
  }, []);

  return (
    <>
      {pending ? (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleChange}
              value={sauce.name}
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
              onChange={handleChange}
              value={sauce.manufacturer}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              onChange={handleChange}
              value={sauce.description}
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
            <button type="button" onClick={handleClick} color="primary">
              ADD IMAGE
            </button>
            <img
              ref={imgvue}
              src={sauce.imageUrl}
              style={{
                maxHeight: "100px",
                display: "block",
                marginTop: "10px",
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="main-pepper">Main Pepper Ingredient</label>
            <input
              type="text"
              className="form-control"
              id="main-pepper"
              name="mainPepper"
              onChange={handleChange}
              value={sauce.mainPepper}
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
                value={sauce.heat}
                onChange={handleChange}
              />
              <input
                type="number"
                className="form-control heat-reading"
                value={sauce.heat}
                disabled
              />
            </div>
          </div>
          <button color="primary">SUBMIT</button>
        </form>
      )}
    </>
  );
}
