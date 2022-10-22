import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';

import './calculadoraBoteco.css';

function CalculadoraBoteco() {
  //Padrão factory method
  function criarInputs() {
    return {
      conta: 0.0,
      qtdePessoas: 1,
      percentualGorjeta: 0.0
    };
  }

  const [estadoInputs, alterarEstadoInputs] = useState(criarInputs());

  const [estadoResultados, alterarEstadoResultados] = useState({
    totalGorjeta: 0.0,
    totalPagar: 0.0,
    totalPorPessoa: 0.0
  });

  useEffect(() => {
    //cálculos
    const percentualDecimal = estadoInputs.percentualGorjeta / 100;
    const totalGorjeta = estadoInputs.conta * percentualDecimal;
    const totalPagar = Number(estadoInputs.conta) + totalGorjeta;
    const totalPorPessoa = totalPagar / estadoInputs.qtdePessoas;

    alterarEstadoResultados({
      totalGorjeta,
      totalPagar,
      totalPorPessoa
    });
  }, [estadoInputs]);

  function zerarDados() {
    alterarEstadoInputs(criarInputs());
  }

  function alteraConta(valor) {
    alterarEstadoInputs({
      ...estadoInputs,
      conta: valor
    });
  }

  function alterarQtdePessoas(valor) {
    alterarEstadoInputs({
      ...estadoInputs,
      qtdePessoas: valor
    });
  }

  function alteraPercentualGorjeta(valor) {
    alterarEstadoInputs({
      ...estadoInputs,
      percentualGorjeta: valor
    });
  }

  return (
    <Col className='p-5'>
      <h1 className='text-center'>Calculadora de Boteco</h1>
      {/* MODIFICAÇÕES */}
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='conta_input'>Conta: </Form.Label>
          <Form.Control
            id='conta_input'
            type='number'
            value={estadoInputs.conta}
            onChange={e => {
              alteraConta(e.target.value);
            }}
            min='0'
            step='0.05'
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='gorjeta_input'>Gorjeta %: </Form.Label>
              <Form.Control
                id='gorjeta_input'
                type='number'
                value={estadoInputs.percentualGorjeta}
                onChange={e => {
                  alteraPercentualGorjeta(e.target.value);
                }}
                min='0'
                step='0.5'
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='qtde_pessoas'>Pessoas na mesa: </Form.Label>
              <Form.Control
                id='qtde_pessoas'
                type='number'
                value={estadoInputs.qtdePessoas}
                onChange={e => {
                  alterarQtdePessoas(e.target.value);
                }}
                min='1'
              />
            </Form.Group>
          </Col>
        </Row>

        <Stack
          direction='horizontal'
          className='d-flex justify-content-between mb-5'
        >
          <Button className='px-5 btn-success shadow-sm disabled'>
            Calcular
          </Button>
          <Button onClick={zerarDados} className='px-5 btn-danger shadow-sm'>
            Zerar
          </Button>
        </Stack>
      </Form>
      {/* INFORMAÇÕES AUTO GERADAS POR useEffect A PARTIR DE estadoInputs */}
      <Row className='text-center'>
        <Col className='text-primary'>
          <h5>Gorjeta</h5>
          <p>
            {'R$ '}
            {estadoResultados.totalGorjeta
              .toFixed(2)
              .toString()
              .replace('.', ',')}
          </p>
        </Col>
        <Col className='text-primary'>
          <h5>Total a pagar:</h5>
          <p>
            {'R$ '}
            {estadoResultados.totalPagar
              .toFixed(2)
              .toString()
              .replace('.', ',')}
          </p>
        </Col>
        <Col className='text-primary'>
          <h5>Total a pagar por pessoa:</h5>
          <p>
            {'R$ '}
            {estadoResultados.totalPorPessoa
              .toFixed(2)
              .toString()
              .replace('.', ',')}
          </p>
        </Col>
      </Row>
    </Col>
  );
}

export default CalculadoraBoteco;
