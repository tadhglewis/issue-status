import { useState, useEffect } from "react";

export default (label) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GitHub rate limiting: 60 requests per hour/unauthenticated - fetches 15 times per hour / sending 30 requests (2 requests per fetch) and caches in localStorage
    if (
      new Date(localStorage.getItem(`issueStatusLastFetch${label}`)) <
      new Date() - 240000
    ) {
      fetchData(setLoading, setError, setResults, label);
    } else {
      setResults(JSON.parse(localStorage.getItem(`issueStatus${label}`)));
      setLoading(false);
      setError();
    }
  }, [label]);

  return [
    loading,
    error,
    results || [],
    () => fetchData(setLoading, setError, setResults, label),
  ];
};

const fetchData = (setLoading, setError, setResults, label) => {
  setLoading(true);
  fetch(
    `https://api.github.com/repos/${process.env.REACT_APP_REPOSITORY}/issues?state=all&labels=issue status,${label}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setError();
      localStorage.setItem(`issueStatusLastFetch${label}`, new Date());
      localStorage.setItem(`issueStatus${label}`, JSON.stringify(data));
      setResults(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.toString());
      localStorage.setItem(`issueStatusLastFetch${label}`, new Date());
      setResults(JSON.parse(localStorage.getItem(`issueStatus${label}`)));
      setLoading(false);
    });
};
