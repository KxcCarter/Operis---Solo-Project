const projectTasks = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECT_TASKS':
      return action.payload;
    default:
      return state;
  }
};

export default projectTasks;
