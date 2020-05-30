import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHomepagesAndStories,
  fullSet,
} from "../../store/detailsPage/actions.js";
import { selectPageData } from "../../store/detailsPage/selectors.js";
import { Jumbotron } from "react-bootstrap";

export default function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);
  useEffect(() => {
    dispatch(fetchHomepagesAndStories());
  }, [dispatch, fullSet]);

  const sortedStories = pageData.stories.sort(function (a, b) {
    return b.id - a.id;
  });

  return (
    <div>
      {pageData.homepages.length > 0 &&
        pageData.homepages.map(
          (homepage) =>
            parseInt(id) === homepage.id && (
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

      {sortedStories.length > 0 &&
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
    </div>
  );
}
