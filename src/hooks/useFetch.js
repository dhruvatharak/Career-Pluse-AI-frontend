/**
 * CareerPulse AI - useFetch Hook
 * Generic hook for executing asynchronous data loaders with loading, error, and data state.
 */

import { useState, useEffect, useCallback } from 'react';

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFunction();
      setData(response?.data ?? response);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
};

export default useFetch;
