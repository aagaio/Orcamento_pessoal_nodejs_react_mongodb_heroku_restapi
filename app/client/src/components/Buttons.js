import React from 'react';
import transactionsService from '../services/transactionsService.js';

export default function Buttons({
  transaction,
  reRender,
  handleButtonEditTransaction,
  openModalHandler,
}) {
  const handleIconEditClick = (event) => {
    handleButtonEditTransaction(transaction);
    openModalHandler(event);
  };

  const handleIconDeleteClick = async (event) => {
    let id = event.target.id;

    handleButtonEditTransaction(transaction);

    let resp = await transactionsService.deleteById(id);
    console.log(resp);
    reRender();
  };

  return (
    <div>
      <div className="col s12 m6 l3" style={styles.icons}>
        <div>
          <i
            className="small material-icons"
            id={transaction._id}
            onClick={handleIconEditClick}
            style={{ cursor: 'pointer' }}
          >
            edit
          </i>
        </div>
        <div>
          <i
            className="small material-icons"
            id={transaction._id}
            onClick={handleIconDeleteClick}
            style={{ cursor: 'pointer' }}
          >
            delete_forever
          </i>
        </div>
      </div>
    </div>
  );
}

const styles = {
  icons: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '80px',
    alignItems: 'right',
    justifyContent: 'right',
    textAlign: 'right',
  },
};
