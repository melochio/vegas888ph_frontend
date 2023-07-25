'use client'

let ISSERVER = typeof window === "undefined";
let token = typeof window === "undefined" ? '':localStorage.getItem('token');

const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token,
    },
};

export default config
