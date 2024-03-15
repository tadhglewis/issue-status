import { useEffect, useState } from "react";

const useDidMount = () => {
  const [hasMounted, setHasMounted] = useState();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return [hasMounted];
};

export default useDidMount;
