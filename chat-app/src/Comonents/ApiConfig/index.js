import axios from "axios";
const token = JSON.parse(localStorage.getItem("ChatToken"));
if (token) {
  var api = axios.create({
    baseURL: "https://chat-app-mern-dnzd.onrender.com/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
} else {
  var api = axios.create({
    baseURL: "https://chat-app-mern-dnzd.onrender.com/api/v1",
  });
}
export default api;
