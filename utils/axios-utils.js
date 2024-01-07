import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3001",
});

export const request = (options) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    //error handling
    throw new Error(error);
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
