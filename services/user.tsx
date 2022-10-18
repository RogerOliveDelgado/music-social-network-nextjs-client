export const createUser = async (
  username: String,
  email: String,
  password: String,
  likedMusic: string[],
  setCookie: Function,
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:4001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        genres: likedMusic,
      }),
    });

    if (response.status === 400) {
      const result = await response.json();

      return result;
    }

    if (response.ok) {
      const result = await response.json();
      setCookie("userToken", result.data, { path: "/" });
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};
