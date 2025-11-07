import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Length,

} from 'class-validator';

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @Length(5, 20)
  password: string;
}
