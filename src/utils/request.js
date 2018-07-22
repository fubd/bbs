import {SHA1} from "./SHA1";

const AppId = "A6053788184630";
const AppKey = "8B3F5860-2646-2C47-DC50-39106919B260";
var now = Date.now();
const secureAppKey = SHA1(AppId+"UZ"+AppKey+"UZ"+now)+"."+now;

const headers = new Headers({
  "X-APICloud-AppId": AppId,
  "X-APICloud-AppKey": secureAppKey,
  "Accept": "application/json",
  "Content-Type": "application/json"
});

const handleResponse = (url, response) => {
  if (response.status < 500) {
    return response.json();
  } else {
    console.error(`Request failed. URL = ${url}. Message = ${response.statusText}`);
    return {error: {message: 'Request failed due to server error'}};
  }
};

export const get = url => {
  return fetch(url, {
    method: 'GET',
    headers: headers
  }).then(res => {
    return handleResponse(url, res);
  }).catch(err => {
    console.error(`Request failed. URL = ${url}. Message = ${err}`);
    return {error: {message: "Request failed."}};
  })
};

export const post = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => {
    return handleResponse(url, res);
  }).catch(err => {
    console.error(`Request failed. URL = ${url}. Message = ${err}`);
    return {error: {message: "Request failed."}};
  })
}

export const put = (url, data) => {
  return fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => {
    return handleResponse(url, res);
  }).catch(err => {
    console.error(`Request failed. URL = ${url}. Message = ${err}`);
    return {error: {message: "Request failed."}};
  })
};
