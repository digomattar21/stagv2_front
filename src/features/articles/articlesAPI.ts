import axios from 'axios';
import ArticlesApi from '../../api/articles';

export async function fetchMainArticles(payload?: any): Promise<any> {
  try {
    let uri = `${process.env.REACT_APP_BASE_URL}/articles`;

    return await axios.get(uri);
  } catch (error) {
    throw error;
  }
}

export async function submitArticle(payload?: any): Promise<any> {
  try {
    const articlesApi: any = ArticlesApi;
    console.log('payload req body', payload);
    return await articlesApi.submitArticles(payload);
  } catch (error) {
    throw error;
  }
}
