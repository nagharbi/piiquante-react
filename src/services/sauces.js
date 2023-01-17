async function getAllSauces() {
  const token = localStorage.getItem("token");
  const reponse = await fetch("http://localhost:3000/api/sauces", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(reponse)
  if (reponse.status === 401 ) {
    expiration();
  }
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
  if (reponse.status === 401 ) {
    expiration();
  }
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
  if (reponse.status === 401 ) {
    expiration();
  }
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
  if (reponse.status === 401 ) {
    expiration();
  }
  const data = await reponse.json();
  return data;
}

async function createSauces(sauce, file) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("sauce", JSON.stringify(sauce));
  formData.append("image", file);
  const reponse = await fetch(`http://localhost:3000/api/sauces`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });
  if (reponse.status === 401 ) {
    expiration();
  }
  const data = await reponse.json();
  return data;
}

async function updateSauces(id, sauce, file) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  if (file) {
    formData.append("sauce", JSON.stringify(sauce));
    formData.append("image", file);
    headers = {
      Authorization: "Bearer " + token,
    };
  }

  const reponse = await fetch(`http://localhost:3000/api/sauces/${id}`, {
    method: "PUT",
    headers: headers,
    body: file ? formData : JSON.stringify(sauce),
  });
  if (reponse.status === 401 ) {
    expiration();
  }
  const data = await reponse.json();
  return data;
}

function expiration() {
  localStorage.clear();
  window.location.reload();
}

export {
  getAllSauces,
  getOneSauce,
  likeDislike,
  deleteSauce,
  createSauces,
  updateSauces,
};
