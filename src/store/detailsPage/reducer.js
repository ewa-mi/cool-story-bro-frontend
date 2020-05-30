const initialState = {
  homepages: [],
  stories: [],
};

export default function detailsPageReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case "SET_EVERYTHING": {
      newState = {
        homepages: action.payload.homepages,
        stories: action.payload.stories,
      };
      break;
    }

    default: {
      // do nothing
    }
  }

  return newState;
}
