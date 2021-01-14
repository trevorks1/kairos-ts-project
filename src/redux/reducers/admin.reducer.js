const adminReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_REQUESTED_ADMIN':
      return action.payload;
    default:
      return state;
  }
};

export default adminReducer;
