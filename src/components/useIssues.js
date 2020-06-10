import { useState, useEffect } from "react";
import config from "../config";

export default () => {
  const [results, setResults] = useState();

  useEffect(() => {
    // GitHub rate limiting: 60 requests per hour/unauthenticated - fetches once per hour. Uses localStorage cache
    if (
      new Date(localStorage.getItem("issueStatusLastFetch")) <
      new Date() - 60 * 60 * 24 * 1000
    ) {
      fetchData(setResults);
    } else {
      setResults(JSON.parse(localStorage.getItem("issueStatusIssues")));
    }
  }, []);

  return [results, () => fetchData(setResults)];
};

const fetchData = (setResults) =>
  fetch(
    `https://api.github.com/repos/${config.user}/issue-status/issues?labels=issue status`
  )
    .then((response) => {
      // TODO: check response for GitHub rate limiting / any other possible issues
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("issueStatusIssues", JSON.stringify(data));
      setResults(data);
      localStorage.setItem("issueStatusLastFetch", new Date());
    })
    .catch((error) => {
      // TODO: handle errors
      console.log(error);
    });
