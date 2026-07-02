import app from './server.ts';

const PORT = process.env.PORT ?? 3333;

console.log(process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});