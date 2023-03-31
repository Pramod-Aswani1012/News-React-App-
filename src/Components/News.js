import React from "react";
import NewsItem from "./NewsItem";
import "./News.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const News = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  // document.title = `${capitalizeFirstLetter(props.category)} - News Ozo`

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;

    setloading(true);
    let data = await fetch(url);

    let parsedData = await data.json();

    console.log(parsedData);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setpage(page + 1);
    setloading(false);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  },[])

  const fetchMoreData = async () => {
    setpage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=013b944d801141978d3f13a85ccc30c3&page=${page}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };

  return (
    <div>
      <h1 className="text-center" style={{"marginTop" : "70px" }}>
        Top Headlines from {capitalizeFirstLetter(props.category)}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 " key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png"
                    }
                    newsUrl={element.url}
                    published={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                    color={props.color}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;