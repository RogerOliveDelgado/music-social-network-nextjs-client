const BASE_URL =
  //   process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND ||
  'http://localhost/users';

export const updateUser = async (
  id: string,
  username: string,
  phone: string,
  image: string,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        phone: phone,
        image: image,
      }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (error) {}
};
