const bookReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIAL_BOOKS':
            return action.payload;
            break;
        case 'ADD_BOOK':
            return [ ...state, { id: state[state.length-1].id+1, ...action.payload}]
        default:
            return state
            break;
    }
  }
  
  export default bookReducer;