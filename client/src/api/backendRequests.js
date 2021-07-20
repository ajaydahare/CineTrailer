import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("movieHubProfile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("movieHubProfile")).token
    }`;
  }
  return req;
});

export const userSignUp = (formData) => API.post("/api/signup", formData);
export const userSignIn = (formData) => API.post("/api/signin", formData);

export const getPacks = () => API.get("/api/subscription");

export const userMakePurchase = (userId, packId, paymentResult) =>
  API.post(`/api/purchase/create/${userId}`, {
    purchase: { purchaseItem: packId, paymentResult: paymentResult },
  });

export const userActivePack = (userId) => API.get(`/api/activepack/${userId}`);

export const cancelPack = (userId) =>
  API.patch(`/api/cancel-subscription/${userId}`);
