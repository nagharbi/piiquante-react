import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSauce from "../components/FormSauce";
import { getOneSauce } from "../services/sauces";

export default function ModifySauce() {
  const [sauce, setSauce] = useState(null);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    async function load() {
      const data = await getOneSauce(id);
      setSauce(data);
    }
    load();
  }, []);
  return (
    <>
      {sauce ? (
        <FormSauce sauce={sauce} />
      ) : (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
