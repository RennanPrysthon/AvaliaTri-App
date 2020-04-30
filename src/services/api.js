import axios from 'axios';
import { store } from '../store/index';
import { showMessage } from 'react-native-flash-message';

const api = axios.create({
  baseURL: 'https://avaliatriapi.herokuapp.com/'
});

const header = () => {
  const { auth } =  store.getState();
  return {
    'Content-Type': 'application/json',
    Authorization: auth.token,
  };
}

export const Api = {
  post: async (url, obj) => {
    try {
      const { data } = await api.post(url, obj, {headers: header()});
      return data;
    } catch (e) {
      showMessage({
        message: "Erro",
        description: `${e}`,
        type: "danger",
        backgroundColor: "#ff7171", // background color
      })
    }
  },
  get: async (url) => {
    try{
      const { data } = await api.get(url, {headers: header()});
      return data;
    } catch (e) {
      showMessage({
        message: "Erro",
        description: `${e}`,
        type: "danger",
        backgroundColor: "#ff7171", // background color
      })
    }
  },
}

export default api;