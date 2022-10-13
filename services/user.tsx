export const logIn = async (
  email: String,
  password: String,
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();
  console.log(email, password);
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

    if (response.ok) {
      const result = await response.json();

      return result;
    }
  } catch (error) {
    console.error(error);
  }
};
