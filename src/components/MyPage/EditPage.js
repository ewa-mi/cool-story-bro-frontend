import React, { useState } from "react";
import "./EditPage.css";

export default function EditPage({
  color: defaultColor,
  background: defaultBackground,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(defaultColor);
  const [background, setBackground] = useState(defaultBackground);
  const [success, setSuccess] = useState(false);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const providedChanges = {
      title: title,
      description: description,
      color: color,
      background: background,
    };
    console.log(providedChanges);
    setSuccess(true);
  };
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
