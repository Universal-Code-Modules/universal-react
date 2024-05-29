import { useCallback } from 'react';
import { Button as BsButton } from './components/bootstrap';
import { Button as FbButton } from './components/flowbite';

function App() {
  const onButtonClick = useCallback((e) => {
    console.log('Button Clicked', e);
  }, []);

  return (
    <>
      <h1>Components</h1>
      <BsButton onClick={onButtonClick}>test</BsButton>
      <FbButton onClick={onButtonClick}>test</FbButton>
    </>
  )
}

export default App
