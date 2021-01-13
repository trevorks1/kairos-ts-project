const agesList = (state = [], action) => {
  switch (action.type) {
    case 'SET_AGES':
      return action.payload;
    default:
      return state;
  }
};

export default agesList;
