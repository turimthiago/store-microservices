import { env } from "./config/env";
import { app } from "./config/app";

app.listen(env.port, () =>
    console.log(`[seller-api] running at http://localhost:${env.port}`)
);
