import * as React from "react";
import { useNavigate } from "react-router-dom";
import RestaurantContext from "../components/restaurantContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
const TAX_RATE = 0.09;


function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// Page for Cart. List of Products the customer considers for checkout.
export default function Cart() {
  // Get card information from restaurant context
  const { checkoutCard } = React.useContext(RestaurantContext);

  const rows = checkoutCard.map((item) => {
    return createRow(item.desc, 1, item.prices[0]);
  });
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const deliveryFee = 5;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal + deliveryFee;
  // const [checked, setChecked] = React.useState([]);
  const navigate = useNavigate();
  const addToCard = () => {
    navigate("/checkout")
  }
  return (
    <div >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>
                  <Checkbox defaultChecked />
                  {row.desc}
                </TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                0
              )} %`}
              </TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery Fee</TableCell>
              <TableCell align="right">{ccyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Grid container spacing={2} justifyContent="center">
          {/* Make Button for Back */}
          <Grid item xs={2}>
            <Button
              onClick={() => navigate(-1)}
              type="back"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Back
            </Button>
          </Grid>
          {/* Make Button for Confrim */}
          <Grid item xs={2}>
            <Button
              onClick={() => addToCard()}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Check Out!
            </Button>
          </Grid>
        </Grid>
      </TableContainer>
    </div>
  );
}
