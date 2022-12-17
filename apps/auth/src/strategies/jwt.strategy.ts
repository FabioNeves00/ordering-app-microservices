import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";

import { jwtSecret } from '../constants';
import { User } from '../users/schemas/user';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    validate(validationPayload: { email: string, sub: string }): User | null {
        return this.usersService.getUserByEmail(validationPayload.email);
    }
}