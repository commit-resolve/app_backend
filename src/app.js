const express = require('express');
//const cors = require('cors');
//const morgan = require('morgan');

const mandateRoutes = require('./routes/mandate_routes');
const errorMiddleware = require('./middlewares/error_middleware');
const requestLogger = require('./middlewares/request_logger_middleware');

const app = express();

// ------------------------
// Global Middlewares
// ------------------------

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
//app.use(morgan('dev'));
app.use(requestLogger);

// ------------------------
// Health Check
// ------------------------

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'Piggy Mandate Service'
  });
});

// ------------------------
// Routes
// ------------------------

app.use('/api/v1/mandates', mandateRoutes);

// ------------------------
// 404 Handler
// ------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ------------------------
// Error Handler
// ------------------------

app.use(errorMiddleware);

module.exports = app;