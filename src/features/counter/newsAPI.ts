import axios from "axios";


export async function fetchTestNews(): Promise<any> {
  try {
    const uri = `${process.env.REACT_APP_BASE_URL}/news`;
    console.log(uri)
    return await axios.get(uri);
  } catch (error) {
    throw error;
  }
}
