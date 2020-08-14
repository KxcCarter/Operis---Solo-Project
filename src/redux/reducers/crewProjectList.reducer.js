const crewProjectList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECT_CREW_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default crewProjectList;
