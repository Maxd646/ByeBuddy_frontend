import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

/**
 * ErrorAlert displays an error or warning message using MUI Alert.
 * @param {string} message - The message to display.
 * @param {string} severity - The severity of the alert ('error', 'warning', etc.).
 */
export default function ErrorAlert({ message, severity = 'error' }) {
  if (!message) return null;
  return <Alert severity={severity}>{message}</Alert>;
}

ErrorAlert.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
}; 