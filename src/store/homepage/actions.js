import axios from "axios";
import { apiUrl } from "../../config/constants";

import { fetchHomepagesAndStories } from "../detailsPage/actions";
import {
  appLoading,
  appDoneLoading,
  setMessage,
  showMessageWithTimeout,
} from "../appState/actions";

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

export const postStory = (providedData) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    dispatch(appLoading());
    try {
      await axios.post(`${apiUrl}/homepages/post`, providedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      dispatch(fetchHomepagesAndStories());
      dispatch(showMessageWithTimeout("success", true, "story added!"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const updateHomepages = (providedChanges) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    dispatch(appLoading());
    try {
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
      dispatch(showMessageWithTimeout("success", true, "homepage changed"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
