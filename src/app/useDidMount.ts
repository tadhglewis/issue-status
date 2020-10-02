import { useEffect, useState } from "react";

export default () => {
  const [hasMounted, setHasMounted] = useState<boolean>();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return [hasMounted];
};
