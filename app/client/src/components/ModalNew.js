import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Deve-se indicar onde o React está. Ver em index.html
Modal.setAppElement('#root');

export default function ModalNew({
  onSave,
  onClose,
  selectedTransaction,
  reRender,
}) {
  // se selectedTransaction é vazio então é uma adição de item, caso contrário será uma edição.

  let operationType = selectedTransaction ? 'edit' : 'add';
  const today = new Date().toISOString().slice(0, 10);
  // console.log(selectedTransaction);

  const [value, setValue] = useState(
    selectedTransaction ? selectedTransaction.value : '0'
  );
  const [category, setCategory] = useState(
    selectedTransaction ? selectedTransaction.category : ''
  );
  const [description, setDescription] = useState(
    selectedTransaction ? selectedTransaction.description : ''
  );
  const [date, setDate] = useState(today);
  const [type, setType] = useState(
    selectedTransaction ? selectedTransaction.type : '-'
  );

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let dateArray = date.split('-');

    const formData = {
      id: selectedTransaction._id,
      description: description,
      value: value,
      category: category,
      type: type,
      year: dateArray[0],
      month: dateArray[1],
      day: dateArray[2],
    };
    onSave(formData);
    onClose();
  };

  const handleRadio = (event) => {
    setType(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const handleValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Modal isOpen={true} style={modalStyle}>
        <div>
          <div style={styles.header}>
            <div>
              <span className="container center" style={styles.title}>
                {operationType === 'add'
                  ? 'Inclusão de lançamento'
                  : 'Edição de lançamento'}
              </span>
            </div>
            <div>
              <button
                className="waves-effect waves-lights btn red dark-4"
                onClick={onClose}
              >
                X
              </button>
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div style={styles.container}>
              <div>
                <label style={styles.radio}>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    value="-"
                    checked={type === '-' ? true : false}
                    disabled={operationType === 'add' ? false : true}
                    onChange={handleRadio}
                  />
                  <span style={styles.expense}>Despesa</span>
                </label>
              </div>
              <div>
                <label style={styles.radio}>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    value="+"
                    checked={type === '+' ? true : false}
                    disabled={operationType === 'add' ? false : true}
                    onChange={handleRadio}
                  />
                  <span style={styles.income}>Receita</span>
                </label>
              </div>
            </div>
            <div className="input-field">
              <input
                id="description"
                type="text"
                value={description}
                autoFocus
                onChange={handleDescription}
              />
              <label className="active" htmlFor="description">
                Descrição:
              </label>
            </div>
            <div className="input-field">
              <input
                id="category"
                type="text"
                value={category}
                onChange={handleCategory}
              />
              <label className="active" htmlFor="category">
                Categoria:
              </label>
            </div>
            <div className="input-field">
              <input
                id="value"
                type="text"
                min="0"
                value={value}
                onChange={handleValue}
              />
              <label className="active" htmlFor="value">
                Valor:
              </label>
            </div>
            <div>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                min="2019-01-01"
                max="2021-12-31"
                required
                onChange={handleDate}
              />
            </div>
            <div>
              <button
                className="waves-effect waves-light btn"
                disabled={
                  !(
                    type &&
                    category &&
                    description &&
                    !isNaN(value) &&
                    value >= 0 &&
                    date
                  )
                }
              >
                Salvar
              </button>
            </div>
            {(isNaN(value) || value < 0) && (
              <div>
                <span style={styles.errorMessage}>
                  O valor deve ser um número positivo!
                </span>
              </div>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '50px',
    alignContent: 'space-between',
    border: '1px',
    alignItems: 'space-between',
    justifyContent: 'center',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '15px',
    marginBottom: '15px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '50px',
    alignContent: 'space-between',
    border: '1px',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '15px',
    marginBottom: '40px',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  radio: {
    marginLeft: '1rem',
    marginRigth: '1rem',
  },
  income: {
    weight: 'bold',
    color: 'green',
  },
  expense: {
    weight: 'bold',
    color: 'red',
  },
  errorMessage: {
    weight: 'bold',
    color: 'red',
  },
};

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 1,
  },
};
