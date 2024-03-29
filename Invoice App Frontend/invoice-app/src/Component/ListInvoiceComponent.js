import React, { useState, useEffect } from 'react';
import { listOfInvoices, getInvoiceById } from '../InvoiceService';
import { useNavigate } from 'react-router-dom';
import InvoiceCard from './Card';

const ListInvoiceComponent = () => {
    const navigate = useNavigate();
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoices, setInvoices] = useState([]);
    

    const handleView = async (invoiceNumber) => {
        try {
            const response = await getInvoiceById(invoiceNumber);
            setSelectedInvoice(response.data);
            navigate(`/invoice/${invoiceNumber}`);
        } catch (error) {
            console.error('Error fetching invoice:', error);
        }
    };

    function addInvoice() {
        navigate('/add-invoice');
    }

    const getAllInvoices = async () => {
        try {
            const response = await listOfInvoices();
            setInvoices(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllInvoices();
    }, []);

    return (
        <div className="container mx-auto">
            <h2 className="text-center text-3xl font-semibold mb-8">Invoices</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Invoice Number</th>
                            <th className="px-4 py-2">Customer Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.invoiceNumber} className="text-center">
                                <td className="border px-4 py-2">{invoice.invoiceNumber}</td>
                                <td className="border px-4 py-2">{invoice.customerName}</td>
                                <td className="border px-4 py-2">{invoice.price}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => handleView(invoice.invoiceNumber)}
                                    >
                                        Open
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedInvoice && <InvoiceCard invoice={selectedInvoice} />}
            <div className="flex justify-center mt-8">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={addInvoice}
                >
                    Add Invoice
                </button>
            </div>
        </div>
    );
};

export default ListInvoiceComponent;
