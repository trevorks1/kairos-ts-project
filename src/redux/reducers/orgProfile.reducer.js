const orgProfileReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ORG_PROFILE':
      console.log('ORG REDUCER', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default orgProfileReducer;
