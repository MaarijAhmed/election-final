import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { RoleType } from "../../roles/ennums/role-type.enum";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ){}

    async login(username: string, password : string) {
        const findUserAndRole = await this.userRepository.findOne({
            where : {
                userName : username
            },
            relations : {
                role : true
            }
        })
        if(!findUserAndRole){
            throw new BadRequestException("User Not Found")
        }

        let role = findUserAndRole.role.roleType;
        let validPassword: string;

        if (role === RoleType.SLIP_MANEGER) {
            validPassword = 'Slip123';
        } else if (role === RoleType.DataAnalyst) {
            validPassword = 'Analyst123';
        } else {
            throw new Error('Invalid role');
        }

        if (password != validPassword) {
            throw new Error('Invalid password');
        }

        const token = this.jwtService.sign({ role }, {secret : "hala_madrid"});
        return token;
    }
}
