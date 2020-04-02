import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-myburger-9f854.firebaseio.com/"
});

export default instance;
