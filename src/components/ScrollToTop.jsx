import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// function to scroll to top of page -> used because we navigating it sometimes spawns you at the same
// y u last left on from prev page
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export default ScrollToTop;
