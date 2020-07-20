import React from 'react';
import Form from './components/Form.js';

export default function App() {
  return (
    <div className="container center">
      <h1 style={{ align: 'center', fontSize: '2rem' }}>
        Bootcamp Full Stack - Desafio Final
      </h1>
      <h2 style={{ align: 'center', fontSize: '1.5rem' }}>
        Controle pessoal financeiro
      </h2>
      <Form />
    </div>
  );
}
