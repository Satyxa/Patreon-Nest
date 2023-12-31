import {Body, Controller, HttpCode, Post} from "@nestjs/common";
import {EmailService} from "../Services/email.service";
import {Throttle} from "@nestjs/throttler";

@Controller('auth')
export class EmailController {
    constructor(private readonly EmailService: EmailService) {}
    @Throttle({ default: { limit: 5, ttl: 10000 } })
    @Post('registration-confirmation')
    @HttpCode(204)
    async confirmEmail(@Body() payload) {
        await this.EmailService.confirmEmail(payload)
    }
    @Throttle({ default: { limit: 5, ttl: 10000 } })
    @Post('registration-email-resending')
    @HttpCode(204)
    async confirmationCodeResending(@Body() payload) {
        await this.EmailService.confirmationCodeResending(payload)
    }
}