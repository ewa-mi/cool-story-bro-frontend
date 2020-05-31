import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHomepagesAndStories,
  fullSet,
} from "../../store/detailsPage/actions.js";
import { selectPageData } from "../../store/detailsPage/selectors.js";
import { selectUser } from "../../store/user/selectors.js";
import { Jumbotron } from "react-bootstrap";
import EditPage from "../../components/MyPage/EditPage.js";
import PostStory from "../../components/MyPage/PostStory.js";

export default function DetailsPage(props) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  const user = useSelector(selectUser);
  const [myPageSubpage, setMyPageSubpage] = useState("");

  useEffect(() => {
    dispatch(fetchHomepagesAndStories());
  }, [dispatch, fullSet]);

  const sortedStories = pageData.stories.sort(function (a, b) {
    return b.id - a.id;
  });

  const isMyPage = pathname === "/me";
  let homepages = pageData.homepages;

  if (user.id && isMyPage) {
    homepages = [
      pageData.homepages.find((homepage) => homepage.userId === user.id),
    ];
  }

  return (
    <div>
      {homepages.length > 0 &&
        homepages.map(
          (homepage) =>
            (isMyPage || parseInt(id) === homepage.id) && (
              <Jumbotron
                key={homepage.id}
                style={{
                  color: homepage.color,
                  background: homepage.backgroundColor,
                }}
              >
                <h2>{homepage.title}</h2>
                <p>{homepage.description}</p>
              </Jumbotron>
            )
        )}

      {isMyPage && !myPageSubpage && user.id && (
        <div style={{ margin: "0 auto", textAlign: "center", margin: "10px" }}>
          <button
            style={{ margin: "10px" }}
            onClick={() => setMyPageSubpage("edit")}
          >
            Edit my page
          </button>
          <button
            style={{ margin: "10px" }}
            onClick={() => setMyPageSubpage("post")}
          >
            Post cool story bro
          </button>
        </div>
      )}

      {!isMyPage &&
        !myPageSubpage &&
        sortedStories.length > 0 &&
        sortedStories.map(
          (story, index) =>
            parseInt(id) === story.homepageId && (
              <div
                key={index}
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <h1>{story.name}</h1>
                <p>{story.content}</p>
                <img
                  src={story.imageUrl}
                  style={{
                    width: "400px",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                />
              </div>
            )
        )}

      {myPageSubpage === "edit" && (
        <EditPage
          color={homepages[0].color}
          background={homepages[0].backgroundColor}
          homepageId={homepages[0].id}
        />
      )}
      {myPageSubpage === "post" && <PostStory />}
    </div>
  );
}
