const sendAction = (value) => {
  return {
    type: "send_type",
    value,
  };
};
export default sendAction