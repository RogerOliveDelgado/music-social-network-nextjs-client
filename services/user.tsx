const BASE_URL_USERS = process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND;

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
    const response = await fetch(`${BASE_URL_USERS}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        genres: likedMusic,
        image:
          "https://res.cloudinary.com/juancarlos/image/upload/v1666942620/gxlttit28glyqcro0reu.png",
      }),
    });
    if (response.status === 400) {
      const result = await response.json();

      return result;
    }

    if (response.ok) {
      const result = await response.json();
      setCookie("userToken", result.data.token, { path: "/" });
      setCookie("username", result.data.username, { path: "/" });
      setCookie("userID", result.data.id, { path: "/" });
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};
