
export function wishlistReducer(state, action) {
  switch (action.type) {
    case "ADD":
      if (state.some(item => item.id === action.product.id)) {
        return state;
      }
      return [...state, action.product];

    case "REMOVE":
      return state.filter(item => item.id !== action.id);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}
