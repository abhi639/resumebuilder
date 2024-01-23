import React from 'react';
import { toAbsoluteUrl } from '../../_metronic/helpers';

const ComingSoon = () => {
  return (
    <div style={{ alignItems: 'center' }}>
      <img
        src={toAbsoluteUrl('/media/icons/duotune/comingsoon.png')}
        alt="Coming Soon"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default ComingSoon;

