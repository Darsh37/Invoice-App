import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createInvoice, getInvoiceById, updateInvoice } from '../InvoiceService';

const InvoiceComponent = () => {
    const [customerName, setCustomerName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const { invoiceNumber } = useParams();

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!customerName) {
            errors.customerName = "Customer name is required,";
            isValid = false;
        }

        if (!price || isNaN(price) || parseFloat(price) <= 0) {
            errors.price = "Price must be a valid number greater than 0";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const saveOrUpdateInvoice = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const invoice = { customerName, price };
        if (invoiceNumber) {
            updateInvoice(invoiceNumber, invoice)
                .then((response) => {
                    alert('Invoice updated successfully');
                    navigate('/');
                })
                .catch((error) => console.log(error));
        } else {
            createInvoice(invoice)
                .then((response) => {
                    alert('Invoice added successfully');
                    navigate('/');
                })
                .catch((error) => console.log(error));
        }
    }

    useEffect(() => {
        if (invoiceNumber) {
            getInvoiceById(invoiceNumber)
                .then((response) => {
                    setCustomerName(response.data.customerName);
                    setPrice(response.data.price);
                })
                .catch((error) => console.log(error));
        }
    }, [invoiceNumber]);

    const pageTitle = () => {
        return invoiceNumber ? <h2 className="text-center">Update Invoice</h2> : <h2 className="text-center">Add Invoice</h2>;
    };

    return (
        <div>
            <br />
            <br />
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-full md:w-1/2">
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            {pageTitle()}
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
                                        Customer Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="customerName"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.customerName ? 'border-red-500' : ''}`}
                                        placeholder="Enter Customer name"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                    />
                                    {errors.customerName && <p className="text-red-500 text-xs italic">{errors.customerName}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                        Price:
                                    </label>
                                    <input
                                        type="text"
                                        id="price"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? 'border-red-500' : ''}`}
                                        placeholder="Enter Price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
                                </div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={(e) => saveOrUpdateInvoice(e)}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceComponent;
