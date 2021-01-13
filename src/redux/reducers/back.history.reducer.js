const backHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BACK_HISTORY_REDUCER':
      return action.payload;
    default:
      return state;
  }
};

export default backHistoryReducer;
