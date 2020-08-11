const defaultState = { roles: [], talent: [], tasks: [] };
const projects = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PROJECT_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default projects;
