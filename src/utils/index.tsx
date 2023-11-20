export const getCurrentAccount: any = () => {
  return JSON.parse(localStorage.getItem("account") ?? "{}");
};

export const BASE_URL_API = "https://imdb-service-production.up.railway.app/api";

export const validateFileSize = (file: File | null) => {
  if (file === null) {
    return true;
  }
  if (file.size > 1024 * 1024 * 10) {
    return false;
  }
  return true;
};

export const filterOption = (input: any, option: any) =>
  option?.label
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .includes(
      input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
    );
