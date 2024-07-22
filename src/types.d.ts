import { UserDto } from "./modules/users/users.dto";

interface EnvConfig {
    HTTP_HOST: string;
    HTTP_PORT: string;
    UPLOAD_PATH: string;
    MONGO_URL: string;
}

declare global {
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface User extends UserDto { }
    }
}