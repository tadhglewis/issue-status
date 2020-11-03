import dayjs from "dayjs";
import { useState, useEffect } from "react";

export default ({ label }: { label: string }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    // GitHub rate limiting: 60 requests per hour/unauthenticated - fetches 15 times per hour / sending 30 requests (2 requests per fetch) and caches in localStorage

    const lastIssueFetch = localStorage.getItem(`issueStatusLastFetch${label}`);

    if (
      dayjs(lastIssueFetch || undefined).isAfter(dayjs().subtract(4, "minute"))
    ) {
    }
  });
};

const fetchData = async (label: string) => {
  fetch(
    `https://api.github.com/repos/${process.env.REACT_APP_REPOSITORY}/issues?state=all&labels=issue status,${label}`
  )
    .then((response) => response.json())
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
