import React, { useState } from "react";
import "./PostStory.css";
import { useDispatch } from "react-redux";
import { postStory } from "../../store/homepage/actions";

export default function PostStory({ homepageId }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();

    const providedData = {
      name: name,
      content: content,
      image: image,
      homepageId: homepageId,
    };
    dispatch(postStory(providedData));
    setSuccess(true);
  };
  return (
    <div>
      <h5>Post a cool story bro</h5>
      <form className="postForm" onSubmit={(event) => onFormSubmit(event)}>
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
        <button
          type="button"
          className="previewImage"
          onClick={() => setIsPreviewImage(true)}
        >
          Preview image
        </button>
        <input type="submit" value="Post!" />
      </form>
      <div>{success && <p>Success! You did it!</p>}</div>
      {isPreviewImage && <img className="displayedImage" src={image} />}
    </div>
  );
}
