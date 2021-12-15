import https from "https";
import { app, options, PORT, connection } from "./configure";

const httpsServer = https.createServer(options, app);

connection.connect();
httpsServer.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
