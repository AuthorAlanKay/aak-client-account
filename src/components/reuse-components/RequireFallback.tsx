// 2023-03-06 20:00:00

import * as React from "react";

export interface IRequireFallbackProps {
  /**
   * @defalut true
   */
  bool?: boolean;
  callback?: () => any;
  children?: React.ReactElement;
  fallback?: React.ReactElement;
}

export function RequireFallback(props: IRequireFallbackProps) {
  const bool = React.useMemo(
    () => (props.bool === undefined ? true : props.bool),
    [props.bool]
  );

  const { callback, children, fallback } = props;

  //

  React.useEffect(() => {
    let id = setTimeout(callback, 64);

    return () => clearTimeout(id);
  }, [callback]);

  return bool ? children : fallback;
}
