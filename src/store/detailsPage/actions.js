import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";

export function fullSet(homepages, stories) {
  return {
    type: "SET_EVERYTHING",
    payload: { homepages: homepages, stories: stories },
  };
}

export function fetchHomepagesAndStories() {
  return async function thunk(dispatch, getState) {
    dispatch(appLoading());

    const [homepagesResponse, storiesResponse] = await Promise.all([
      axios.get(`http://localhost:4000/homepages`),
      axios.get(`http://localhost:4000/stories`),
    ]);

    dispatch(
      fullSet(homepagesResponse.data.homepages, storiesResponse.data.stories)
    );
    dispatch(appDoneLoading());
  };
}
