import { SetMetadata } from "@nestjs/common";

export const IS_ADMIN_KEY = "requiredRole";

export const AdminOnly = () => SetMetadata(IS_ADMIN_KEY, "admin");
