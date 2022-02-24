import React, { useState, useEffect } from 'react';
const url = '/maitenance';

const checkIfUnderMaitenance = async () => {
  try {
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.upgrade
  } catch (error) {
    return false;
  }
};

function useLogic() {
  const [underMaitenance, setUnderMaitenance] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      const result = await checkIfUnderMaitenance();
      
      if (result) {
        setUnderMaitenance(true);
      }
      setLoading(false);
    };
    get();
  }, []);

  return { underMaitenance, isLoading };
}

export default useLogic;
