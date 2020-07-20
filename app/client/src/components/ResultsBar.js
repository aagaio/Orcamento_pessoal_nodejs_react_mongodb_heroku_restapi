import React from 'react';

export default function ResultsBar({ transactionsProp }) {
  // Refatorar. Colocar como um módulo auxiliar, pois se repete em Form.js e aqui.
  const toMyCurrency = (number) => {
    number = parseFloat(number);
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  let expenses = transactionsProp
    .filter((transaction) => {
      return transaction.type === '-' ? true : false;
    })
    .reduce((accum, current) => accum + current.value, 0);

  let income = transactionsProp
    .filter((transaction) => {
      return transaction.type === '+' ? true : false;
    })
    .reduce((accum, current) => accum + current.value, 0);

  return (
    <div>
      <hr style={styles.line} />
      <div style={styles.resultBar}>
        <div>Lançamentos: {transactionsProp.length}</div>
        <div>
          Receitas: <span style={styles.positive}>{toMyCurrency(income)}</span>
        </div>
        <div>
          Despesas:&nbsp;
          <span style={styles.negative}>{toMyCurrency(expenses)}</span>
        </div>
        <div>
          Saldo:&nbsp;
          <span
            style={income - expenses < 0 ? styles.negative : styles.positive}
          >
            {toMyCurrency(income - expenses)}
          </span>
        </div>
      </div>
      <hr style={styles.line} />
    </div>
  );
}

const styles = {
  resultBar: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'space-between',
    border: '1px',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '5px',
    marginRight: '10px',
    marginTop: '5px',
    marginBottom: '5px',
  },
  line: {
    height: '2px',
    borderWidth: '0',
    color: 'gray',
    backgroundColor: 'gray',
    marginTop: '5px',
    marginBottom: '5px',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
};
