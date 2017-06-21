const allusers = (state = [], action) => {
  switch(action.type) {
    case 'ALL_USERS':
      return action.users;
    case 'CLEAR_ALL_USERS':
      return [];
    default:
      return state;
  }
}

export default allusers;
