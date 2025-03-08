import { User } from "@interfaces/index";

export interface LoginRequest{
    email:string;
    password:string;
}

export interface SignUpRequest extends User {
    name:string;
    password:string;
}

