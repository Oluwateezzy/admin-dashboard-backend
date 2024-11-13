import { Types } from "mongoose";

export interface IJwtPayload {
    email: string;
    sub: string;
}
