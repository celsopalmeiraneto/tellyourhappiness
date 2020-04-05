import React, { useState } from 'react';
import styled from 'styled-components';

const PANTONE_CLASSIC_BLUE = '#0F4C81';
const PANTONE_CORNHUSK = '#F2D6AE';

const ScAppWrapper = styled.div`
  align-items: center;
  background-color: #C7D5E2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const ScTheQuestion = styled.h1`
  color: ${PANTONE_CLASSIC_BLUE};
  margin-top: 0;
`;

const ScButton = styled.button`
  background-color: ${PANTONE_CLASSIC_BLUE};
  border-radius: 2px;
  border: 0;
  color: ${PANTONE_CORNHUSK}; 
  font-size: 20px;
  font-weight: 600;
  height: 50px;
  margin: 0 20px;
  min-width: 100px;

  :active:enabled {
    border: 1px white solid;
  }
`;

const sendAnswer = async (isHappy : boolean) : Promise<void> => {
  const req = new Request('/api/amIHappy', {method: 'POST', headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify({amIHappy: isHappy})});
  await fetch(req);
}

function App() {
  const [sendingAnswer, setSendingAnswer] = useState<boolean>(false);

  const onClickSend = async (isHappy : boolean) : Promise<void> => {
    setSendingAnswer(true);
    await sendAnswer(isHappy);
  }

  return (
    <ScAppWrapper>
      <ScTheQuestion>Are you happy now?</ScTheQuestion>
      <div>
        <ScButton disabled={sendingAnswer} onClick={() => onClickSend(true)}>Yes</ScButton>
        <ScButton disabled={sendingAnswer} onClick={() => onClickSend(false)}>No</ScButton>
      </div>
    </ScAppWrapper>
  );
}

export default App;
