import {IsEmail, IsNotEmpty, isString, Length} from "class-validator";

export class createUserPayloadClass {
    @Length(3, 10)
    login: string
    @IsEmail({}, { message: 'Invalid email message' })
    email: string
    @Length(6, 20)
    password: string
}

export class confirmationCodeClass {
    @IsNotEmpty()
    code: string
}

export class emailClass {
    @IsNotEmpty()
    email: string
}

export class createBlogPayloadClass {
    @Length(0, 15)
    name: string
    @Length(0, 500)
    description: string
    @Length(0, 100)
    websiteUrl: string
}

export class createdPostPayloadClass {
    @Length(0, 30)
    title: string
    @Length(0, 100)
    shortDescription: string
    @Length(0, 1000)
    content: string
    @Length(1)
    blogId?: string
}

export class LikeStatusClass {
    @Length(4, 7)
    likeStatus: 'Like' | 'Dislike' | 'None'
}