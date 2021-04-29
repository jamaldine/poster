export default function (state = {}, action) {
    switch (action.type) {
      case "ADD_COMMENT":
        return { ...state, addPost: action.payload };
      default:
        return state;
    }
  }
  