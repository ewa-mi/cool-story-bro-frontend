import axios from "axios";
import { apiUrl } from "../../config/constants";
import { appLoading, appDoneLoading } from "../appState/actions";
import { fetchHomepagesAndStories } from "../detailsPage/actions";

export function setHomepages(homepages) {
  return {
    type: "SET_HOMEPAGES",
    payload: homepages,
  };
}

export async function fetchHomepages(dispatch, getState) {
  dispatch(appLoading());

  const response = await axios.get("http://localhost:4000/homepages");

  dispatch(setHomepages(response.data.homepages));
  dispatch(appDoneLoading());
}

export const updateHomepages = (providedChanges) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    const response = await axios.patch(
      `${apiUrl}/homepages/edit`,
      providedChanges,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    dispatch(setHomepages(response.data));
    dispatch(fetchHomepagesAndStories());
  };
};
