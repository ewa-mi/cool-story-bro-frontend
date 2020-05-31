import React, { useState } from "react";

export default function PostStory() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const onFormSubmit = (event) => {
    event.preventDefault();

    const providedData = {
      name: name,
      content: content,
      image: image,
    };
    console.log(providedData);
    setSuccess(true);
  };
  return (
    <div>
      <h5>Post a cool story bro</h5>
      <div style={{ width: "400px", margin: "0 auto" }}>
        <form onSubmit={(event) => onFormSubmit(event)}>
          <label>
            Name
            <input
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </label>
          <label>
            Content
            <input
              onChange={(event) => setContent(event.target.value)}
              value={content}
            />
          </label>
          <label>
            Image URL
            <input
              onChange={(event) => setImage(event.target.value)}
              value={image}
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
        <div>{success && <p>Success! You did it!</p>}</div>
      </div>
    </div>
  );
}
