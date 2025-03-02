
import { Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 10 },
  { name: "Feb", sales: 20 },
  { name: "Mar", sales: 15 },
  { name: "Apr", sales: 25 },
  { name: "May", sales: 36 },
  { name: "Jun", sales: 28 },
  { name: "Jul", sales: 40 },
  { name: "Aug", sales: 35 },
  { name: "Sep", sales: 30 },
  { name: "Oct", sales: 26 },
  { name: "Nov", sales: 22 },
  { name: "Dec", sales: 18 },
];

const transactions = [
  { name: "Jagannath S.", date: "24.05.2023", amount: "$124.97", status: "Paid" },
  { name: "Anand A.", date: "23.05.2023", amount: "$102.49", status: "Pending" },
  { name: "Kartik S.", date: "22.05.2023", amount: "$99.75", status: "Paid" },
  { name: "Jimmy P.", date: "22.05.2023", amount: "$70.52", status: "Paid" },
  { name: "Rakesh R.", date: "22.05.2023", amount: "$70.52", status: "Pending" },
];




const Dashboard = () => {
  

  return <div>
     <div className="">
   
     

      <Box p={3}>

<Grid container spacing={3}>
  <Grid item xs={12} md={4}>
    <Card>
      <CardContent>
        <Typography color="textSecondary">Sales</Typography>
        <Typography variant="h6">$152k</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} md={4}>
    <Card>
      <CardContent>
        <Typography color="textSecondary">Cost</Typography>
        <Typography variant="h6">$99.7k</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} md={4}>
    <Card>
      <CardContent>
        <Typography color="textSecondary">Profit</Typography>
        <Typography variant="h6">$32.1k</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12}>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sales Revenue
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3f51b5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={6}>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>
                    <Chip label={row.status} color={row.status === "Paid" ? "success" : "warning"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} md={6}>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
        Top Products by Units Sold
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>
                    <Chip label={row.status} color={row.status === "Paid" ? "success" : "warning"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  </Grid>
</Grid>
</Box>
      
    </div>
  </div>;


};

// Компонент таблицы
export default Dashboard;
