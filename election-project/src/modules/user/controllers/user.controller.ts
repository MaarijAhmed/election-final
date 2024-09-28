import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    async login(@Body() loginDto: {username : string, password: string}) {
        const { username, password } = loginDto;
        return this.userService.login(username, password);
    }
}