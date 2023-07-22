
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Component1 from '../components/Component1.tsx';
import DepartmentList from '../components/DepartmentList.tsx';

interface Props {
  completedSteps: boolean;
}

const SecondPage: React.FC<Props> = ({ completedSteps }) => {
  const history = useNavigate();
  useEffect(() => {
    if (completedSteps === false) {
      history("/")
    }
  }, [completedSteps]);

  return (
    <div >
      <Component1 />
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
