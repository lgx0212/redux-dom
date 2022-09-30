const initState = { value: "defaultValue" };
const reducer = (state = initState, action) => {
  const { type } = action;
  switch (type) {
    case "send_type":
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
export default reducer
