import axios from 'axios';

export async function fetchMainArticles(payload?: any): Promise<any> {
  try {
    let uri = `${process.env.REACT_APP_BASE_URL}/articles`;

    return await axios.get(uri);
  } catch (error) {
    throw error;
  }
}
