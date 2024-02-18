// routes/invoiceRoutes.js

const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoiceModel");
const verifyToken = require("../middleware/authMiddleware");

// Create a new invoice
router.post("/",verifyToken, async (req, res) => {
  const {
    invoiceNumber,
    date,
    clientName,
    companyName,
    companyAddress,
    companyEmail,
    serviceName,
    serviceDetails,
    dueDate,
    subtotal,
  } = req.body;

  try {
    const newInvoice = new Invoice({
      invoiceNumber,
      date,
      clientName,
      companyName,
      companyAddress,
      companyEmail,
      serviceName,
      serviceDetails,
      dueDate,
      subtotal,
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all invoices
router.get("/", verifyToken, async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one invoice by ID
router.get("/:id", verifyToken, getInvoice, (req, res) => {
  res.json(res.invoice);
});

// Update an existing invoice
router.put("/:id", verifyToken, getInvoice, async (req, res) => {
  try {
    const updatedInvoice = await res.invoice.set(req.body).save();
    res.json(updatedInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an invoice
router.delete("/:id", verifyToken, getInvoice, async (req, res) => {
  try {
    await res.invoice.remove();
    res.json({ message: "Invoice deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get an invoice by ID
async function getInvoice(req, res, next) {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.invoice = invoice;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
