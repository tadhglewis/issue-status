import { useState, useEffect } from "react";
import config from "../config";

export default (label) => {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GitHub rate limiting: 60 requests per hour/unauthenticated - fetches 15 times per hour / sending 30 requests (2 requests per fetch) and caches in localStorage
    if (
      new Date(localStorage.getItem(`issueStatusLastFetch${label}`)) <
      new Date() - 180000
    ) {
      fetchData(setResults, setLoading, label);
    } else {
      setResults(JSON.parse(localStorage.getItem(`issueStatus${label}`)));
      setLoading(false);
    }
  }, []);

  return [loading, {}, results, () => fetchData(setResults, setLoading, label)];
};

const fetchData = (setResults, setLoading, label) => {
  setLoading(true);
  fetch(
    `https://api.github.com/repos/${config.user}/issue-status/issues?state=all&labels=issue status,${label}`
  )
    .then((response) => {
      // TODO: check response for GitHub rate limiting / any other possible issues
      return response.json();
    })
    .then((data) => {
      localStorage.setItem(`issueStatusLastFetch${label}`, new Date());
      localStorage.setItem(`issueStatus${label}`, JSON.stringify(data));
      setResults(data);
      setLoading(false);
    })
    .catch((error) => {
      // TODO: handle errors
      console.log(error);
    });
};
