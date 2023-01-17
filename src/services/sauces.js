import defaultOptions from "./defaultOptions";

async function getAllSauces() {
  const reponse = await fetch(
    "http://localhost:3000/api/sauces",
    defaultOptions
  );
  const data = await reponse.json();
  return data;
}

async function getOneSauce(id) {
  const reponse = await fetch(
    `http://localhost:3000/api/sauces/${id}`,
    defaultOptions
  );
  const data = await reponse.json();
  return data;
}

async function likeDislike(id, like) {
  defaultOptions.headers["Content-Type"] = "application/json";
  const reponse = await fetch(`http://localhost:3000/api/sauces/${id}/like`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({
      like,
    }),
  });
  const data = await reponse.json();
  return data;
}

async function deleteSauce(id) {
  const reponse = await fetch(`http://localhost:3000/api/sauces/${id}`, {
    method: "DELETE",
    ...defaultOptions,
  });
  const data = await reponse.json();
  return data;
}

async function createSauces(sauce, file) {
  const formData = new FormData();
  formData.append("sauce", JSON.stringify(sauce));
  formData.append("image", file);
  const reponse = await fetch(`http://localhost:3000/api/sauces`, {
    method: "POST",
    ...defaultOptions,
    body: formData,
  });
  const data = await reponse.json();
  return data;
}

async function updateSauces(id, sauce, file) {
  const formData = new FormData();
  defaultOptions.headers["Content-Type"] = "application/json";

  if (file) {
    formData.append("sauce", JSON.stringify(sauce));
    formData.append("image", file);
    delete defaultOptions.headers["Content-Type"];
  }

  const reponse = await fetch(`http://localhost:3000/api/sauces/${id}`, {
    method: "PUT",
    ...defaultOptions,
    body: file ? formData : JSON.stringify(sauce),
  });
  const data = await reponse.json();
  return data;
}

export {
  getAllSauces,
  getOneSauce,
  likeDislike,
  deleteSauce,
  createSauces,
  updateSauces,
};
