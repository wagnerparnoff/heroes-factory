import express from 'express';

const app = express();

//middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//start server
const PORT = process.env.PORT ?? 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});