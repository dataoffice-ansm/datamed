import { useEffect, useState } from 'react';

export const Index = () => {
  const [enabled, enable] = useState(false);

  useEffect(() => {
    enable(true);
  }, []);

  return (
    <>
      <p> TODO </p>
      {enabled && <p>TEMP</p>}
    </>
  );
};
