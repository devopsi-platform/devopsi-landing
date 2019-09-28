import React, { memo, PropsWithChildren } from 'react';

export const MemoizedChild = memo(({ children }: PropsWithChildren<{}>) => {
  return <>{children}</>;
});
