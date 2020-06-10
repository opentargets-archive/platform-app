import ReactGA from 'react-ga';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { googleAnalyticsID } from '../configuration';

function GoogleAnalyticsWrapper({
  gaId = googleAnalyticsID,
  children,
  debug = false,
}) {
  const history = useHistory();

  useEffect(() => {
    ReactGA.initialize(gaId, { debug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      const unlisten = history.listen(location => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
      });

      return () => {
        unlisten();
      };
    },
    [history]
  );

  return children;
}

export default GoogleAnalyticsWrapper;
