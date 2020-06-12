import React from "react";
import Skeleton from "./skeleton";
import Component from "./component";

export default ({ loading, components }) => {
  return !loading ? (
    components?.length > 0 ? (
      components?.map((component) => (
        <Component key={component.id} component={component} />
      ))
    ) : (
      <p>No Components found.</p>
    )
  ) : (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
};
