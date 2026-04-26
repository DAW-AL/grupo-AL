import { LoginDto } from '../dtos/input/login.dto';
export declare class AuthController {
    constructor();
    login(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
