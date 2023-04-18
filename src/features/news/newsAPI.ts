import axios from 'axios';

export async function fetchTestNews(payload?: any): Promise<any> {
  try {
    let uri = `${process.env.REACT_APP_BASE_URL}/news`;
    if (payload) {
      const queryString: any = Object.entries(payload)
        .map(([key, value]) => `${encodeURIComponent(key)}=${value}`)
        .join('&');
      uri = uri + '?' + queryString;
    }

    return await axios.get(uri);
  } catch (error) {
    throw error;
  }
}
