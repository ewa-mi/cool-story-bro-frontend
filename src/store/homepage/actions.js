import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";

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
