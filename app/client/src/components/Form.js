import React, { useState, useEffect } from 'react';
import transactionsService from '../services/transactionsService.js';
import ResultsBar from './ResultsBar.js';
import ModalNew from './ModalNew.js';
import ResultsBody from './ResultsBody.js';

export default function Form() {
  const today = new Date().toISOString().slice(0, 7);

  const [initialDate, setInitialDate] = useState(today);
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState('');
  const [transactionFilter, setTransactionFilter] = useState('');
  const [render, setRender] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInitialDate = (event) => {
    setInitialDate(event.target.value);
  };

  const handleTransactionFilter = (event) => {
    setTransactionFilter(event.target.value.toLowerCase());
    // console.log(transactionFilter);
  };

  const setReRender = () => {
    render ? setRender(false) : setRender(true);
  };

  useEffect(() => {
    const retrieveTransactions = async () => {
      try {
        let date = initialDate.slice(0, 7);
        //console.log(date);
        let resp = await transactionsService.getByDate(date);
        console.log(resp);
        let responseFiltered = resp.data
          .filter(
            (element) =>
              element.description.toLowerCase().match(transactionFilter) !==
              null
          )
          .sort((a, b) => a.day - b.day);
        setTransactions(responseFiltered);
      } catch (err) {
        console.log(err);
      }
    };
    retrieveTransactions(initialDate);
  }, [initialDate, transactionFilter, render]);

  const openModalHandler = (event) => {
    if (event.target.value === 'newTransaction') {
      setTransaction('');
    }

    setIsModalOpen(true);
  };

  const handleButtonEditTransaction = (editTransaction) => {
    setTransaction(editTransaction);
  };

  const handlePersistTransaction = async (formData) => {
    const {
      id,
      category,
      description,
      value,
      type,
      year,
      month,
      day,
    } = formData;

    const data = {
      category,
      description,
      value,
      type,
      year,
      month,
      day,
    };

    if (id) {
      try {
        let resp = await transactionsService.updateById(id, data);
        console.log(resp);

        setReRender();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let resp = await transactionsService.create(data);
        console.log(resp);

        setReRender();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="datepicker" style={styles.Date}>
        <input
          type="month"
          id="date"
          name="date"
          value={initialDate}
          min="2019-01"
          max="2021-12"
          required
          onChange={handleInitialDate}
        />
      </div>
      <div>
        <ResultsBar transactionsProp={transactions} />
      </div>
      <div style={styles.container}>
        <div>
          <button
            className="waves-effect waves-light btn-small"
            onClick={openModalHandler}
            value="newTransaction"
          >
            + NOVO LANÇAMENTO
          </button>
        </div>

        <div style={styles.filter}>
          <input
            type="text"
            placeholder="Filtro"
            id="filter"
            className="validate"
            onChange={handleTransactionFilter}
          />
        </div>
      </div>
      <div>
        <ul>
          <ResultsBody
            transactionsProp={transactions}
            handleButtonEditTransaction={handleButtonEditTransaction}
            reRender={setReRender}
            openModalHandler={openModalHandler}
          />
        </ul>
      </div>
      <div>
        {isModalOpen && (
          <ModalNew
            onSave={handlePersistTransaction}
            onClose={handleClose}
            currentDate={initialDate}
            selectedTransaction={transaction}
            reRender={setReRender}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: '1px',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: '0px',
    marginRight: '0px',
    marginTop: '15px',
    marginBottom: '15px',
  },
  Date: {
    marginTop: '20px',
    marginBottom: '15px',
  },
  filter: {
    marginTop: '5px',
    marginBottom: '10px',
    marginLeft: '15px',
    width: '50rem',
  },
};
