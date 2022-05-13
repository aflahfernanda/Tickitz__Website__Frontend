import axios from "axios";

const axiosApiIntances = axios.create({
  baseURL: "http://localhost:3001/"
});
// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    };
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      if (error.response.data.msg !== "jwt expired") {
        localStorage.clear();
        window.location.href = "/login";
      } else {
        const refreshToken = localStorage.getItem("refreshToken");
        // console.log(refreshToken);
        axiosApiIntances
          .post("auth/refresh", { refreshToken })
          .then((res) => {
            // res = {
            //   data: {
            //     data: {
            //       id: ...
            //       token: ...
            //       refreshToken: ...
            //     }
            //   }
            // }
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch(() => {
            localStorage.clear();
            window.location.href = "/login";
          });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiIntances;
