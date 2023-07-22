
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';

const App: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage setCompletedSteps={setCompletedSteps} />} />
          <Route
            path="/second"
            element={<SecondPage completedSteps={completedSteps} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
