const userTalentPool = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_TALENT':
      return action.payload;
    default:
      return state;
  }
};

export default userTalentPool;
