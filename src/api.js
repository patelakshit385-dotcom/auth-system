const API = import.meta.env.VITE_AUTH_API;

export async function loginUser(username, password) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}