import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/useCartStore";

export const useCartHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // This runs only on the client
    setHydrated(true);
  }, []);

  return hydrated;
};
