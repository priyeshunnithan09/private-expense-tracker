
const db = require('../database');


exports.createTransaction = (transaction, callback) => {
    const { type, category, amount, date, description } = transaction;
    const query = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;

    db.run(query, [type, category, amount, date, description], function (err) {
        callback(err, this ? this.lastID : null);
    });
};


exports.getAllTransactions = (callback) => {
    const query = `SELECT * FROM transactions`;

    db.all(query, [], (err, rows) => {
        callback(err, rows);
    });
};


exports.getTransactionById = (id, callback) => {
    const query = `SELECT * FROM transactions WHERE id = ?`;

    db.get(query, [id], (err, row) => {
        callback(err, row);
    });
};


exports.updateTransaction = (id, updatedTransaction, callback) => {
    const { type, category, amount, date, description } = updatedTransaction;
    const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;

    db.run(query, [type, category, amount, date, description, id], function (err) {
        callback(err, this.changes);
    });
};

exports.deleteTransaction = (id, callback) => {
    const query = `DELETE FROM transactions WHERE id = ?`;

    db.run(query, [id], function (err) {
        callback(err, this.changes);
    });
};
