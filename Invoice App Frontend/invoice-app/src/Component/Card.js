import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteInvoice, getInvoiceById } from "../InvoiceService";

const InvoiceCard = () => {
    const navigate = useNavigate();  
    const { invoiceNumber } = useParams();
    const [invoiceCard, setInvoiceCard] = useState(null);

    useEffect(() => {
        if (invoiceNumber) {
            getInvoiceById(invoiceNumber)
                .then((response) => {
                    setInvoiceCard(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching invoice:', error);
                });
        }
    }, [invoiceNumber]);

    const handlePrint = () => {
        window.print();
    };

    const updateInvoice = () => {
        navigate(`/edit-invoice/${invoiceNumber}`);
    };

    const removeInvoice = () => {
        deleteInvoice(invoiceNumber)
            .then(() => {
                // You can navigate to a different route or perform any other action after successful deletion
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (!invoiceCard) {
        return null; // If invoiceCard is null, don't render anything
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-4/5 p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Invoice</h2>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-4" onClick={updateInvoice}>Edit</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={removeInvoice}>Delete</button>
                    </div>
                </div>
                <div className="mb-8">
                    <p className="text-lg font-semibold text-gray-700">Customer Name:</p>
                    <p className="text-lg text-gray-800">{invoiceCard.customerName}</p>
                </div>
                <div className="mb-8">
                    <p className="text-lg font-semibold text-gray-700">Invoice Number:</p>
                    <p className="text-lg text-gray-800">{invoiceCard.invoiceNumber}</p>
                </div>
                <div className="mb-8">
                    <p className="text-lg font-semibold text-gray-700">Price:</p>
                    <p className="text-lg text-gray-800">{invoiceCard.price}</p>
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handlePrint}>Print</button>
                </div>
            </div>
        </div>
    );
}

export default InvoiceCard;
