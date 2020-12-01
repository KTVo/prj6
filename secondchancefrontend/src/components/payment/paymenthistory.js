import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const TAX_RATE = 0.08;

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

//Generates a window with the receipt of any one case
function GetCreditCardNumber(record_ass_id)
{
    console.log("rec_ass_id = " + record_ass_id);
    let lastDigits = " ****";

    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify( {"record_assessment_id": record_ass_id} )
    };

    fetch("http://52.247.220.137/get_payment", requestOptions)
        .then(response => response.json())
        .then(response => console.log(response));

    return lastDigits;
}

// fixes numbers to only 2 decimal places
function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}
// shows how many of a quantity
function priceRow(qty) {
    return qty;
}
// formats the rows to display information
function createRow(desc, qty) {
    const price = priceRow(qty);
    return {desc, qty, price};
}
// shows subtotal
function subtotal(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}


const rows = [
    //here is where one of the inputs will be pulled into the table
    // under description is what kind of service theyre getting
    createRow('Description ID', 150.00),
];
//these functions do math to add up the total.
//Not sure if you'll need them since its going to be backend data
const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export function Paymenthistory(caseDetails) {
    const classes = useStyles();

    console.log("caseDetails for payment right hurr")
    console.log(caseDetails);

    return (
    // this is were the table starts
        // line 94 is where the header starts
        // line 135,137 is where the doctor id and card number
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            <h1 style={{marginLeft: "25%"}}>
                                Payment History
                            </h1>
                        </TableCell>
                        <TableCell align="right"> </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Description:</TableCell>
                        <TableCell align="right">Price (USD):</TableCell>
                        <TableCell align="right"> </TableCell>
                        <TableCell align="right">Sum (USD):</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.desc}>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3}/>
                        <TableCell colSpan={2}> Subtotal: </TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax: </TableCell>
                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell colSpan={2}> Total: </TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Secondary Physician: {caseDetails.caseDetails.phy_name} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Patient: {caseDetails.caseDetails.pat_name} </TableCell>
                    </TableRow>
                        <TableCell align="left">Card Number: **** **** ****
                            {GetCreditCardNumber(caseDetails.caseDetails.record_assessment_id)}
                        </TableCell>
                    <TableRow>
                        <TableCell align="left">Status: {caseDetails.caseDetails.assessment.toUpperCase()} </TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </TableContainer>
    );
}


