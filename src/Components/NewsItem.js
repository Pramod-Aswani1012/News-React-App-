import React from 'react'
import PropTypes from 'prop-types';
import './NewsItem.css';

export default function NewsItem(props) {
  let {
    title,
    description,
    imageUrl,
    newsUrl,
    published,
    author,
    source,
    color,
  } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className={`badge rounded-pill bg-${color}`}> {source} </span>
        </div>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}....</h5>
          <p className="card-text">{description}....</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(published).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}


NewsItem.defaultProps = {
  title: "Here Comes Title",
  description: "Here Comes Description",
}

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string

};