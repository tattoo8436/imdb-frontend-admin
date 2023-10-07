export const getCurrentAccount: any = () => {
  return JSON.parse(localStorage.getItem("account") ?? "{}");
};

export const BASE_URL_API = "http://localhost:8080/api";
