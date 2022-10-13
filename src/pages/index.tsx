import { useEffect, useState } from 'react';

const HomePage = () => {
  const [enabled, enable] = useState(false);
  useEffect(() => {
    enable(true);
  }, []);

  return (
    <>
      <p className="bg-red-500 border border-solid">TODO</p>
      {enabled && <p>TEMP</p>}
    </>
  );
};

export default HomePage;
