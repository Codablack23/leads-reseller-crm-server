import { UserSessionData } from "@interfaces/index";
import { SessionData } from 'express-session';



export { }

declare global {
    namespace Express {
        export interface Request extends Error { }
    }
}

declare module "express-session" {
    interface SessionData {
        user: UserSessionData;
    }
}

