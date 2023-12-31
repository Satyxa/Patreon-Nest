import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Headers,
    Req,
    UseGuards, BadRequestException
} from '@nestjs/common';
import {PostService} from "../Services/post.service";
import {CommentsService} from "../Services/comments.service";
import {AuthGuard} from "../Middleware/AuthGuard";
import {CommentContentClass, LikesPayloadClass} from "../Types/classesTypes";

type createBlogPayloadType = {
    name: string,
    description: string,
    websiteUrl: string
}

@Controller('comments')
export class CommentsController {
    constructor(private readonly CommentsService: CommentsService) {
    }

    @Get(':id')
    async getComment(@Param('id') id: string,
                     @Headers() headers) {
        if(!id) throw new BadRequestException([{message: 'id is required', field: 'id'}])
        return await this.CommentsService.getComment(id, headers)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @HttpCode(204)
    async updateContent(@Param('id') id: string,
                        @Body() CommentContentPayload: CommentContentClass,
                        @Req() req: any) {
        if(!id) throw new BadRequestException([{message: 'id is required', field: 'id'}])
        return await this.CommentsService.updateContent(id, req.userId, CommentContentPayload.content)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteComment(@Param('id') id: string,
                        @Req() req: any) {
        if(!id) throw new BadRequestException([{message: 'id is required', field: 'id'}])
        return await this.CommentsService.deleteComment(id, req.userId)
    }

    @UseGuards(AuthGuard)
    @Put(':id/like-status')
    @HttpCode(204)
    async updateLikeStatus(@Param('id') id: string,
                        @Body() likesPayload: LikesPayloadClass,
                        @Req() req: any) {
        if(!id) throw new BadRequestException([{message: 'id is required', field: 'id'}])
        return await this.CommentsService.updateLikeStatus(id, likesPayload.likeStatus, req.userId)
    }

}