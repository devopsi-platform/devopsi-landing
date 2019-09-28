import { useState, useCallback } from 'react';

export function useForceUpdate() {
  const [, updateComponent] = useState<{}>({});

  return useCallback(() => {
    updateComponent({});
  }, []);
}
