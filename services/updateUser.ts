const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND || 'http://localhost:4001/user';

export const updateUser = async (
  id: string,
  username: string,
  phone: string,
  image: string,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        phone: phone,
        image: image,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
