const initialState = {
  homepages: [],
};

export default function homepageReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case "SET_HOMEPAGES": {
      newState.homepages = action.payload;
      break;
    }

    default: {
      // do nothing
    }
  }

  return newState;
}
