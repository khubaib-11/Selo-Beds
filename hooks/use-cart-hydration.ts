import { useEffect, useState } from "react";

export const useCartHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // This runs only on the client
    setHydrated(true);
  }, []);

  return hydrated;
};
