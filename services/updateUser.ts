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
      mode: 'cors',
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify({
        username: username,
        phone: phone,
        image: image,
      }),
    });
    const data = await response.json();
  } catch (error) {}
};
