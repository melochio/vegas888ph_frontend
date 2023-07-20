const config = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:3000/',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    },
};

export default config