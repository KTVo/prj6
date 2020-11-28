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
// ~~~~~goal is to use this to pull backend data to front end to be displayed~~~~
export function PaymentInfo(props)
{

    //Calls to endpoint for payment info
    console.log("Testing all payment history information");
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.parse({"some kind of payment id":1})
    };

    fetch("http://52.247.220.137:80/get_all_physician_records",requestOptions)
        .then(response => response.json())
        .then(
            (result) =>
            {
                class PaymentInfo {
                    PaymentInfo.description = DescriptionId;
                    PaymentInfo.doctorID = DoctorId;
                    PaymentInfo.price = PriceId;
                }





            }
        );

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

export function Paymenthistory() {
    const classes = useStyles();


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
                        <TableCell align="left">Secondary Physician: the doctor id </TableCell>
                    </TableRow>
                        <TableCell align="left">Card Number: **** **** **** 1234</TableCell>
                    <TableRow>
                        <TableCell align="left">Status: PAID </TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </TableContainer>
    );
}


