import { useCallback, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

import api from './api';
import Chat from './Chat';

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

function App() {
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState({ model: 'Qwen/Qwen1.5-0.5B-Chat' });
  const [messages, setMessages] = useState([]);
  const onSend = useCallback(async (e) => {
    if (isLoading) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    const { query, model } = values;
    try {
      setLoading(true);
      const response = await api.makeRequest('sendMessage', { body: JSON.stringify({ query, model }) });
      setMessages([
        ...messages,
        { role: 'User', value: query },
        { role: 'AI', value: response.response },
      ]);
      setValues({ ...values, query: '' });
    } finally {
      setLoading(false);
    }
  }, [values, setValues, setLoading, setMessages, messages, isLoading ]);
  const onChange = useCallback(({ target: { name, value } }) => {
    setValues({...values, [name]: value});
  }, [setValues, values]);
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={onSend}>
            <h2>Chat with AI</h2>
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control as="select" name='model' value={values['model']} onChange={onChange}>
                <option value="Qwen/Qwen1.5-0.5B-Chat">Qwen/Qwen1.5-0.5B-Chat</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Query</Form.Label>
              <Form.Control as="textarea" name='query' rows={3} value={values['query']} onChange={onChange} />
            </Form.Group>
            <StyledButton variant="primary" type="submit" disabled={isLoading}>
              { isLoading ? 'Sending...' : 'Send' }
            </StyledButton>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Chat messages={messages} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
