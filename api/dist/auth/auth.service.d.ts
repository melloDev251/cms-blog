import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createUser.dto';
import { UserLoginDto } from './dto/userLogin.dto';
export declare class AuthService {
    private readonly repo;
    private jwt;
    constructor(repo: Repository<User>, jwt: JwtService);
    login(loginDto: UserLoginDto): Promise<{
        token: string;
        user: User;
    }>;
    register(createUserDto: CreateUserDto): Promise<User>;
    verifyPassword(password: string, userHash: string): Promise<boolean>;
    getOneUser(id: number): Promise<User>;
}
