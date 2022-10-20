export default async function searchCharacters(search: string): Promise<any[]> {
  // const apiKey: string = "f9dfb1e8d466d36c27850bedd2047687";
  try {
    const response = await fetch(`http://localhost:4002/search/${search}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
