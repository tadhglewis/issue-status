import { useState, useEffect } from "react";
import moment from "moment";

const useRefetch = (refetch, updateTimeAgoDep) => {
  const [timeAgo, setTimeAgo] = useState(
    moment(
      new Date(localStorage.getItem(`issueStatusLastFetchcomponent`))
    ).fromNow()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        new Date(localStorage.getItem(`issueStatusLastFetchcomponent`)) <
        new Date() - 240000
      ) {
        refetch(() => {
          setTimeAgo(
            moment(
              new Date(localStorage.getItem(`issueStatusLastFetchcomponent`))
            ).fromNow()
          );
        });
      } else {
        setTimeAgo(
          moment(
            new Date(localStorage.getItem(`issueStatusLastFetchcomponent`))
          ).fromNow()
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  useEffect(() => {
    setTimeAgo(
      moment(
        new Date(localStorage.getItem(`issueStatusLastFetchcomponent`))
      ).fromNow()
    );
  }, [updateTimeAgoDep]);

  return [timeAgo];
};

export default useRefetch;
