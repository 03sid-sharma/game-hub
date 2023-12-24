import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "d096524b2b084ba6bcad6764cc6cfdc5",
  },
});