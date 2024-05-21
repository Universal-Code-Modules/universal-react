import { useCallback, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 10px;
`;

function Chat({ messages }) {
  
  return (
    <StyledContainer>
      {messages.map(({ id, role, value }) => (
        <div key={id}>
          <b>{role}</b>: <span>{value}</span>
        </div>
      ))}
    </StyledContainer>
  );
}

export default Chat;
