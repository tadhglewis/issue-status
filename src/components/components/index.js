import React from "react";
import Skeleton from "./skeleton";
import Component from "./component";

export default ({ loading, components }) => {
  return !loading ? (
    components.map((component) => (
      <Component key={component.id} component={component} />
    ))
  ) : (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
};
