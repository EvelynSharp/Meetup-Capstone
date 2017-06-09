const userError = (state = '', action) => {
  switch(action.type) {
    case 'USER_ERROR':
      return action.userError
    case 'RESET_USER_ERROR':
      return ''
    default:
      return state;
  }
}

export default userError;
