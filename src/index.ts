import { app, PORT, connection } from './configure'

connection.connect();

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});