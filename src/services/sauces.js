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

async function createSauce(sauce, image) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("sauce", JSON.stringify(sauce));
  formData.append("image", image);
  const reponse = await fetch("http://localhost:3000/api/sauces", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });
  const data = await reponse.json();
  return data;
}

async function updateSauce(id, sauce, image) {
  const token = localStorage.getItem("token");
  console.log("file: ", image);
  console.log(sauce);
  let body = JSON.stringify(sauce);
  if (image) {
    const body = new FormData();
    body.append("sauce", JSON.stringify(sauce));
    body.append("image", image);
  }
  console.log("body", body);
  const reponse = await fetch("http://localhost:3000/api/sauces/" + id, {
    method: "PUT",
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body,
  });
  const data = await reponse.json();
  return data;
}

async function deleteSauce(id) {
  const token = localStorage.getItem("token");
  const reponse = await fetch(`http://localhost:3000/api/sauces/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await reponse.json();
  return data;
}

export {
  getAllSauces,
  getOneSauce,
  likeDislike,
  createSauce,
  updateSauce,
  deleteSauce,
};
