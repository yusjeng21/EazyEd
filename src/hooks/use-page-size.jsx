import { useEffect, useState } from "react";

export function usePageSize() {
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768)
        setPageSize(4); // Mobile: 2x2 grid
      else if (window.innerWidth < 1024)
        setPageSize(6); // Tablet: 2x3 grid
      else setPageSize(9); // Desktop: 3x3 grid
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return pageSize;
}
