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

export { getAllSauces };
