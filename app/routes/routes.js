const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService.js');

transactionRouter.post('/', service.createTransaction);
// transactionRouter.get('/', service.findTransactions);
transactionRouter.get('/:period', service.findTransactionsByPeriod);
transactionRouter.get('/:description', service.findTransactionsByDescription);
transactionRouter.put('/:id', service.updateTransaction);
transactionRouter.delete('/:id', service.removeTransaction);

// transactionRouter.get('/grade/', service.findAll);
// transactionRouter.get('/:id', service.findOne);
// transactionRouter.delete('/grade/', service.removeAll);

module.exports = transactionRouter;
