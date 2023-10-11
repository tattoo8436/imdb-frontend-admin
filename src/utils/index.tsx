export const getCurrentAccount: any = () => {
  return JSON.parse(localStorage.getItem("account") ?? "{}");
};

export const BASE_URL_API = "http://localhost:8080/api";

export const validateFileSize = (file: File | null) => {
  if(file === null){
    return true;
  }
  if (file.size > 1024 * 1024 * 10) {
    return false;
  }
  return true;
};
