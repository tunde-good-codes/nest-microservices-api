import { Role } from "../constant/roles.constant";

export interface UserPayload {
  sub: string; // user id
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

// This travels through RabbitMQ messages between services
export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}
