import React, { useState } from "react";
import axios from "axios";
import "./EditPage.css";
import { useSelector } from "react-redux";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../../store/user/selectors.js";

export default function EditPage({
  color: defaultColor,
  background: defaultBackground,
  homepageId,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(defaultColor);
  const [background, setBackground] = useState(defaultBackground);
  const [success, setSuccess] = useState(false);
  const user = useSelector(selectUser);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const providedChanges = {
      title: title,
      description: description,
      color: color,
      background: background,
      homepageId: homepageId,
    };

    patchEdit(providedChanges);
    setSuccess(true);
  };

  async function patchEdit(providedChanges) {
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
    } catch (error) {
      console.log("OH NO AN ERROR", error.message);
      console.log("WHAT HAPPENED?", error.response.data);
    }
  }

  return (
    <div>
      <h5>Edit your page</h5>
      <form className="editForm" onSubmit={(event) => onFormSubmit(event)}>
        <label>
          Title
          <input
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </label>
        <label>
          Description
          <input
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </label>
        <label>
          Text Color
          <input
            type="color"
            onChange={(event) => setColor(event.target.value)}
            value={color}
          />
        </label>
        <label>
          Background
          <input
            type="color"
            onChange={(event) => setBackground(event.target.value)}
            value={background}
          />
        </label>

        <input type="submit" value="Save changes" />
      </form>
      <div>{success && <p>Success! You did it!</p>}</div>
    </div>
  );
}
