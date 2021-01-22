import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import Navbar from "../components/Navbar";

const Index = () => {
  const [url, setUrl] = useState("https://");
  const [short, setShort] = useState();

  const onChange = (event) => {
    setUrl(event.target.value);
  };

  const onEncurtar = async () => {
    const response = await fetch("http://localhost:3333/api/short", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setShort(data.shortner);
  };

  const shortURL = `http://localhost:3333/${short?.hash}`;

  return (
    <div>
      <Navbar />
      <Container>
        <Card className="m-5">
          <Card.Header>
            <Card.Title>Criar Encurtador</Card.Title>
          </Card.Header>
          <Card.Body>
            {short?.hash && (
              <Alert variant="success">
                Sucesso! Seu link foi encurtado, acesse:{" "}
                <a target="_blank" href={shortURL}>
                  {shortURL}
                </a>
              </Alert>
            )}
            <Form>
              <Form.Group>
                <Form.Label>Insira a URL</Form.Label>
                <Form.Control
                  onChange={onChange}
                  value={url}
                  name="url"
                  placeholder="https://google.com.br"
                />
              </Form.Group>
              <Button onClick={onEncurtar}>Encurtar !</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Index;
