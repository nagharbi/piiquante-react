async function login(email, password) {
  const reponse = await fetch("http://localhost:3000/api/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await reponse.json();
  return data;
}

async function signup(email, password) {
  const reponse = await fetch("http://localhost:3000/api/auth/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await reponse.json();
  return data;
}

export { login, signup };
