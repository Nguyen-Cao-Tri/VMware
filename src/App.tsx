import React, { useCallback } from 'react';
import './styles/App.scss';
import './styles/reset.css';
import Router from './config/routes/routes';
import LogProvider, { Handler } from './hooks/logProvider/LogProvider';
import { url } from './utils/env';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import useRequest from './hooks/useRequest/useRequest';
const App: React.FC = () => {
  // const request = useRequest();
  const customHandler: Handler = useCallback((error: Error) => {
    console.error('FROM Custom:', error);
  }, []);
  console.log(url);

  return (
    <LogProvider handler={customHandler}>
      <div className="wrapper">
        <Router />
        <ToastContainer />
      </div>
    </LogProvider>
  );
};
export default App;
