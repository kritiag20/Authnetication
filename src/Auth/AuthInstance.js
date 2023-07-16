import axios from "axios";

const instance = axios.create({
  baseURL: "https://asia-northeast1-willeder-official.cloudfunctions.net/api",
});

export default instance;
