import { useEffect, useState } from "react";

export default () => {
  const [hasMounted, setHasMounted] = useState();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return [hasMounted];
};
