import { useCookies } from "react-cookie";

export const logIn = async (
  email: String,
  password: String,
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:4001/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status === 400) {
      const result = await response.json();

      return result;
    }

    if (response.ok) {
      const result = await response.json();

      localStorage.setItem("userToken", result.data);

      return result;
    }
  } catch (error) {
    console.error(error);
  }
};
