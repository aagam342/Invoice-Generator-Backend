// models/invoiceModel.js

const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clientName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  serviceName: {
    type: String,
    required: true,
  },
  serviceDetails: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
