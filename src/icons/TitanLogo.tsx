import React from 'react';

const TitanLogo: React.FC<{ width?: number; height?: number }> = ({ width = 24, height = 24 }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={'https://imagedelivery.net/IIHgLbARMXFdZxFellG7Fg/cf8d931e-7271-4eb3-bdee-e0e8ea477800/public'} width={width} height={height} alt="Titan aggregator" />;
};

export default TitanLogo;
