const causesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CAUSES':
      return action.payload;
    default:
      return state;
  }
};

export default causesReducer;
