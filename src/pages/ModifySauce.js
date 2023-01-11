import React from "react";
import { useParams } from "react-router-dom";
import FormSauce from "../components/FormSauce";

export default function ModifySauce() {
  const params = useParams();
  const id = params.id;

  return <FormSauce sauceId={id} />;
}
