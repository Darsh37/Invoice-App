import {BrowserRouter , Routes, Route } from 'react-router-dom';
import FooterComponent from "./Component/FooterComponent";

import ListInvoiceComponent from "./Component/ListInvoiceComponent";
import InvoiceCard from './Component/Card';
import InvoiceComponent from './Component/AddInvoiceCompnent';


// import '././App.css';

function App() {
  return (
    <div className="App flex flex-col h-screen justify-between mr-0 p-0">
      <BrowserRouter>
        {/* <HeaderComponent /> */}
        <div className= "container">
          <Routes>
              <Route path = "/" element = { <ListInvoiceComponent /> }/>
              <Route path = "/invoice/:invoiceNumber" element = { <InvoiceCard/> }/>              
              <Route path = "/add-invoice" element = { <InvoiceComponent />} ></Route>
              <Route path = "/edit-invoice/:invoiceNumber" element = { <InvoiceComponent />}></Route>             
            </Routes>
        </div>      
        <FooterComponent />
        </BrowserRouter>
        
      
       
    </div>
  );
}

export default App;
