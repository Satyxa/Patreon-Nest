import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { UserService } from '../Services/user.service';
import {createUserPayloadType, UserAccountDBType, userViewT} from "../Types/types";
import {User} from "../Mongoose/UserSchema";
import {createUserPayloadClass} from "../Types/classesTypes";
import {AuthGuard, BasicAuthGuard} from "../Middleware/AuthGuard";

export type queryPayload = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    searchLoginTerm: string,
    searchEmailTerm: string,
    searchNameTerm: string,
    sortDirection: string
}

@Controller('users')
export class UserController {
    constructor(private readonly UserService: UserService) {}

    @Get()
    async getAllUsers(@Query() payload: queryPayload) {
        return await this.UserService.getAllUsers(payload);
    }
    @Get(':id')
    async getOneUser(@Param('id') id: string): Promise<User | null> {
        if(!id) throw new BadRequestException([{message: 'id is required', field: 'id'}])
        return await this.UserService.getOneUser(id)
    }
    @UseGuards(BasicAuthGuard)
    @Post()
    async createUser(@Body() createUserPayload: createUserPayloadClass) {
        const {login, email, password} = createUserPayload
        return await this.UserService.createUser(login, email, password)
    }
    @UseGuards(BasicAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: string){
        if(!id) throw new BadRequestException([{message: 'id is required', field: 'id'}])
        return await this.UserService.deleteUser(id)
    }
}