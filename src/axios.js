// Temporary axios stub file
const axios = {
  defaults: {
    withCredentials: false
  },
  get: async () => {
    console.log("Axios get method called - this is a stub");
    return { data: { success: false } };
  },
  post: async () => {
    console.log("Axios post method called - this is a stub");
    return { data: { success: false } };
  }
};

export default axios; 