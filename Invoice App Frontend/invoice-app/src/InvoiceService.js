import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8080/invoices';

export const listOfInvoices = () => {
    return axios.get(EMPLOYEE_BASE_REST_API_URL)
};

export const createInvoice = (invoice) => {
    return axios.post(EMPLOYEE_BASE_REST_API_URL, invoice)
}

export const getInvoiceById = (invoiceNumber) => {
    return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + invoiceNumber);
}

export const updateInvoice = (invoiceNumber, invoice) => {
    return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' + invoiceNumber, invoice);
}

export const deleteInvoice = (invoiceNumber) => {
    return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + invoiceNumber);  
}