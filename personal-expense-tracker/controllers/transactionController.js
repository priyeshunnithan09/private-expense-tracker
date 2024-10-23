
const transactionModel = require('../models/transactionModel');

exports.createTransaction = (req, res) => {
    const transaction = req.body;
    transactionModel.createTransaction(transaction, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, ...transaction });
    });
};

exports.getAllTransactions = (req, res) => {
    transactionModel.getAllTransactions((err, transactions) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(transactions);
    });
};

exports.getTransactionById = (req, res) => {
    const id = req.params.id;
    transactionModel.getTransactionById(id, (err, transaction) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.json(transaction);
    });
};

exports.updateTransaction = (req, res) => {
    const id = req.params.id;
    const updatedTransaction = req.body;
    transactionModel.updateTransaction(id, updatedTransaction, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ error: 'Transaction not found' });
        res.json({ id, ...updatedTransaction });
    });
};

exports.deleteTransaction = (req, res) => {
    const id = req.params.id;
    transactionModel.deleteTransaction(id, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ error: 'Transaction not found' });
        res.status(204).send();
    });
};
