const token = localStorage.getItem("token");

const defaultOptions = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default defaultOptions;
