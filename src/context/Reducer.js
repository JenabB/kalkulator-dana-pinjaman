// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "GET_DANA":
      return {
        ...state,
        dana: state.payload,
      };

    default:
      return state;
  }
};
