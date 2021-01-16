const registrationReducer = (state = [], action) => {
  switch (action.type) {
    case 'ORG_REGISTERED':
      return action.payload;
    default:
      return state;
  }
};

export default registrationReducer;
