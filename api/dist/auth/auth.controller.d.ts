import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { Request, Response } from 'express';
import { User } from './entities/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginUser(loginDto: UserLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    registerUser(body: CreateUserDto): Promise<User>;
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
    authStatus(user: User): {
        status: boolean;
        user: User;
    };
}
