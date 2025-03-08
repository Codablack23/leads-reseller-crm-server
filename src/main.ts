import "reflect-metadata"
import { runAppConfig } from "@core/core.config";

async function main(){
    const app = await runAppConfig()
    app.startServer()
}

main()
.then(() => console.log())
.catch((err) => { throw err });