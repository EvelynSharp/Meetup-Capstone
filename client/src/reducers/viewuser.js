const viewuser = (state = {}, action) => {
  switch(action.type) {
    case 'VIEW_USER':
      return action.userinfo
    default:
      return state;
  }
}

export default viewuser;
