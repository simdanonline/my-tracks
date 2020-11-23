const { Toast } = require("native-base");

export const displayError = (err) => {
  let errm = err.message;
  if (err.response) {
    if (err.response.data) {
      if (err.response.data.error) {
        errm = err.response.data.error;
      }
    }
  }
  Toast.show({
    type: "danger",
    text: errm,
    duration: 3500,
  });
};

export const getErrm = (err) => {
  let errm = err.message;
  if (err.response) {
    if (err.response.data) {
      if (err.response.data.error) {
        errm = err.response.data.error;
      }
    }
  }
  return errm;
};
