export default function (state = {}, action) {
  switch (action.type) {
    case "ALL_POSTS":
      return { ...state, allPosts: action.payload };
    case "GET_USER":
      return { ...state, users: action.payload };
    case "USER_POSTS":
      return { ...state, userPosts: action.payload };
    case "ADD_POST":
      return { ...state, addPost: action.payload };
    case "GET_POST":
      return { ...state, getPost: action.payload };
    default:
      return state;
  }
}
