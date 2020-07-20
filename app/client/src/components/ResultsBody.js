import React from 'react';
import Buttons from './Buttons';

export default function Result({
  transactionsProp,
  reRender,
  handleButtonEditTransaction,
  openModalHandler,
}) {
  const toMyCurrency = (number) => {
    number = parseFloat(number);
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div>
      {transactionsProp.map((transaction, index) => {
        return (
          <li
            style={transaction.type === '-' ? styles.negative : styles.positive}
            key={index}
          >
            <div style={styles.fatherContainer}>
              <div className="col s12 m6 l3" style={styles.day}>
                {String(transaction.day).padStart(2, '0')}
              </div>
              <div className="col s12 m6 l3" style={styles.subcontainer}>
                <div style={styles.category}>{transaction.category}</div>
                <div style={styles.description}>{transaction.description}</div>
              </div>
              <div className="col s12 m6 l3 right" style={styles.currency}>
                {toMyCurrency(transaction.value)}
              </div>
              <div>
                <Buttons
                  className="col s12 m6 l3 right"
                  transaction={transaction}
                  handleButtonEditTransaction={handleButtonEditTransaction}
                  reRender={reRender}
                  openModalHandler={openModalHandler}
                />
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
}

const styles = {
  fatherContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginLeft: '0px',
    marginRight: '10px',
    marginTop: '15px',
    padding: '0px',
    marginBottom: '15px',
    height: '25px',
  },
  subcontainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '15px',
    marginRight: '10px',
    padding: '0px',
    marginTop: '5px',
    marginBottom: '5px',
    width: '550px',
  },
  category: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    fontSize: '1rem',
    alignItems: 'flex-start',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  currency: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'right',
    marginLeft: '0px',
    marginRight: '0px',
    padding: '2px',
    alignItems: 'right',
    fontSize: '1.1rem',
    textAlign: 'right',
  },
  day: {
    marginLeft: '15px',
    marginRight: '5px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  positive: {
    backgroundColor: '#aaf1df',
    padding: '1px',
    marginBottom: '2px',
  },
  negative: {
    backgroundColor: '#f2abb1',
    padding: '1px',
    marginBottom: '2px',
  },
};
