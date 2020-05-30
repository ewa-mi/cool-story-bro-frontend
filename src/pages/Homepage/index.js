import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setHomepages, fetchHomepages } from "../../store/homepage/actions";
import { selectHomepages } from "../../store/homepage/selectors";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import "./index.css";

export default function Homepage() {
  const dispatch = useDispatch();
  const homepages = useSelector(selectHomepages);

  useEffect(() => {
    dispatch(fetchHomepages);
  }, [dispatch, setHomepages]);

  return (
    <>
      <Jumbotron>
        <h1>Homepages</h1>
      </Jumbotron>
      {homepages.length && (
        <div>
          {homepages.map((homepage) => (
            <div
              key={homepage.id}
              style={{
                color: homepage.color,
                background: homepage.backgroundColor,
              }}
              className="singleHomepage"
            >
              <h2>{homepage.title}</h2>
              <p>{homepage.description}</p>
              <Link to={`/homepages/${homepage.id}`} className="visitButton">
                Visit page
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
