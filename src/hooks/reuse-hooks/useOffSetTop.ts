// 2023-03-06 20:00:00

import * as React from "react";

export default function useOffSetTop(top: number = 100) {
  const [offsetTop, setOffSetTop] = React.useState(false);

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > top) {
        setOffSetTop(true);
      } else {
        setOffSetTop(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [top]);

  return offsetTop;
}

// Usage
// const offset = useOffSetTop(100);
