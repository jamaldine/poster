export default function (state = {}, action) {
    switch (action.type) {
      case "LOGIN":
        return { ...state, login: action.payload };
      case "AUTH":
        return { ...state, login: action.payload };
      case "REGISTER":
        return { ...state, register: action.payload };
      case "LOGOUT":
        return { ...state, logout: action.payload };
      case "ALL_USERS":
        return { ...state, users: action.payload };
        case "UPDATE_PROFIL":
        return { ...state, profil: action.payload };
      default:
        return state;
    }
  }