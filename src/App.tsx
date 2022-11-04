import React, { useCallback } from 'react';
import './styles/App.css';
import Router from './config/routes/routes';
import LogProvider, { Handler } from './hooks/logProvider/LogProvider';
// import useRequest from './hooks/useRequest/useRequest';

const App: React.FC = () => {
  // const request = useRequest();
  const customHandler: Handler = useCallback((error: Error) => {
    console.error('FROM Custom:', error);
  }, []);
  return (
    <LogProvider handler={customHandler}>
      <div className="wrapper">
        <Router />
      </div>
    </LogProvider>
  );
};
export default App;
