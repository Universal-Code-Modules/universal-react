import { useCallback, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

import api from './api';
import Chat from './Chat';

const StyledLabel = styled(Form.Label)`
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

function App() {
  const [isInited, setInited] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [values, setValues] = useState({ provider: 'openai' });
  const [messages, setMessages] = useState([]);
  const onSend = useCallback(async (e) => {
    if (isLoading && !values.provider) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    const { query, model, provider } = values;
    try {
      setLoading(true);
      const response = await api.makeRequest('sendMessage', { provider, body: JSON.stringify({ query, model }) });
      setMessages([
        ...messages,
        { role: 'User', value: query },
        { role: 'AI', value: response.reply },
      ]);
      setValues({ ...values, query: '' });
    } finally {
      setLoading(false);
    }
  }, [values, setValues, setLoading, setMessages, messages, isLoading ]);
  const onChange = useCallback(({ target: { name, value } }) => {
    setValues({...values, [name]: value});
  }, [setValues, values]);
  useEffect(() => {
    const fetchModels = async () => {
      const { provider } = values;
      if (!provider || isInited) {
        return;
      }
      try {
        const response = await api.makeRequest('models', { provider });
        setModels(response.list);
        setInited(true);
      } catch (e) {
        console.error(e);
      }
    };
    fetchModels();
  }, [values, isInited, setInited]);
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={onSend}>
            <h2>Chat with AI</h2>
            <Form.Group className="mb-3">
              <StyledLabel>Provider</StyledLabel>
              <Form.Control as="select" name='provider' value={values['provider']} onChange={onChange}>
                <option value="openai">OpenAI</option>
                <option value="hf">HuggingFace</option>
              </Form.Control>
              <StyledLabel>Model</StyledLabel>
              <Form.Control as="select" name='model' value={values['model']} onChange={onChange}>
                {models.map(({ name }) => (
                  <option value={name}>{name}</option>
                ))}
              </Form.Control>
              <StyledLabel>Query</StyledLabel>
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
