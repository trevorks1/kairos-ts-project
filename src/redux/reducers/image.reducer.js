const imageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_IMAGE_URL':
      console.log('IMAGE REDUCER: ', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default imageReducer;
