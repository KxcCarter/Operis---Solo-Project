const defaultState = { roles: [], talent: [], tasks: [] };
const projectDetails = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROJECT_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default projectDetails;
