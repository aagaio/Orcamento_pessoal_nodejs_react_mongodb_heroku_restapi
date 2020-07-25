const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const createTransaction = async (req, res) => {
  const { description, value, category, year, month, day, type } = req.body;
  monthStr = String(month).padStart(2, 0);
  dayStr = String(day).padStart(2, 0);

  const transaction = new TransactionModel({
    description: description,
    value: value,
    category: category,
    year: year,
    month: month,
    day: day,
    yearMonth: `${year}-${monthStr}`,
    yearMonthDay: `${year}-${monthStr}-${dayStr}`,
    type: type,
  });

  try {
    const result = await transaction.save(transaction);
    res.send(result);
    console.log(`POST / - ${JSON.stringify(result)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    console.log(`POST / - ${JSON.stringify(error.message)}`);
  }
};

const findTransactionsByPeriod = async (req, res) => {
  const period = req.params.period;

  try {
    const result = await TransactionModel.find({ yearMonth: period });
    res.send(result);

    console.log(`GET / - yearMonth=${period}`);
  } catch (error) {
    res.status(500).send({
      message: 'Erro ao buscar as transações para o mês: ' + period,
    });
    console.log(
      `GET / - yearMonth=${period} - ${JSON.stringify(error.message)}`
    );
  }
};

const findTransactionsByDescription = async (req, res) => {
  const stringToFind = req.params.description;

  try {
    const result = await TransactionModel.find({
      description: { $regex: `.*${stringToFind}.*`, $options: 'i' },
    });

    res.send(result);

    console.log(`GET / - description = ${stringToFind}`);
  } catch (error) {
    res.status(500).send({
      message: 'Erro ao buscar as transações para a descrição: ' + stringToFind,
    });
    console.log(
      `GET / - description=${stringToFind} - ${JSON.stringify(error.message)}`
    );
  }
};

const updateTransaction = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Erro! Não existem dados para atualizar!',
    });
  }

  const id = req.params.id;
  const { description, value, category, year, month, day, type } = req.body;
  monthStr = String(month).padStart(2, 0);
  dayStr = String(day).padStart(2, 0);

  try {
    const result = await TransactionModel.findOneAndUpdate(
      { _id: id },
      {
        description: description,
        value: value,
        category: category,
        year: year,
        month: month,
        day: day,
        yearMonth: `${year}-${monthStr}`,
        yearMonthDay: `${year}-${monthStr}-${dayStr}`,
        // type: type, <- A categoria não poderá ser editada no front-end
      }
    );

    res.send({ message: 'Transação atualizada com sucesso!' });

    // console.log(`PUT /api/transaction - ${id} - ${JSON.stringify(req.body)}`);
    console.log(`PUT /api/transaction - ${id} - ${JSON.stringify(result)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a transaction id: ' + id });
    console.log(`PUT /api/transaction - ${JSON.stringify(error.message)}`);
  }
};

const removeTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await TransactionModel.findOneAndDelete({ _id: id });

    res.send({ message: 'Transação excluida com sucesso!' });

    console.log(`DELETE /api/transaction/${id} - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel excluir a transação id: ' + id });
    console.log(`DELETE /api/transacao - ${JSON.stringify(error.message)}`);
  }
};

module.exports = {
  findTransactionsByPeriod,
  createTransaction,
  updateTransaction,
  removeTransaction,
  findTransactionsByDescription,
};
