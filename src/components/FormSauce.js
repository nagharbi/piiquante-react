import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSauces, getOneSauce, updateSauces } from "../services/sauces";

export default function FormSauce({ sauceId }) {
  const initSauce = {
    name: "",
    manufacturer: "",
    description: "",
    imageUrl: "",
    mainPepper: "",
    heat: 1,
  };

  const imputImg = useRef();
  const imgvue = useRef();
  const navigate = useNavigate();
  const [sauce, setSauce] = useState(initSauce);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.files) {
      // modifier un fichier
      console.log(e.target.files);
      getBase64(e.target.files[0]);
      setFile(e.target.files[0]);
    } else {
      // modifier un autre champs (name , heat...)
      // e.target.name = heat ;
      // e.target.value = 7 ;(la valeur que j'ai modifier)
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
    setLoading(false);
    try {
      setLoading(true);
      if (sauceId) {
        await updateSauces(sauceId, sauce, file);
      } else {
        await createSauces(sauce, file);
      }
      setLoading(false);
      navigate("/sauces");
    } catch (error) {
      console.error(error);
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
        setLoading(true);
        const data = await getOneSauce(id);
        setSauce(data);
        setLoading(false);
      }
    }
    setLoading(false);
    load(sauceId);
  }, []);

  return (
    <>
      {loading ? (
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
              value={sauce.name}
              onChange={handleChange}
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
              value={sauce.manufacturer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={sauce.description}
              onChange={handleChange}
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
              value={sauce.mainPepper}
              onChange={handleChange}
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
                disabled
                value={sauce.heat}
              />
            </div>
          </div>
          <button color="primary">SUBMIT</button>
        </form>
      )}
    </>
  );
}
