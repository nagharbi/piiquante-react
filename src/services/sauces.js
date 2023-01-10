import { json } from "react-router-dom";

async function getAllSauces() {
  const token = localStorage.getItem("token");
  const reponse = await fetch("http://localhost:3000/api/sauces", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await reponse.json();
  return data;
}

async function getOneSauce(id) {
  const token = localStorage.getItem("token");
  const reponse = await fetch(`http://localhost:3000/api/sauces/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await reponse.json();
  return data;
}

async function likeDislike(id, like) {
  const token = localStorage.getItem("token");
  const reponse = await fetch(`http://localhost:3000/api/sauces/${id}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      like,
    }),
  });
  const data = await reponse.json();
  return data;
}

export { getAllSauces, getOneSauce, likeDislike };
