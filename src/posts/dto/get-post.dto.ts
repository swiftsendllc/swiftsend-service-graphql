import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class GetPostInput {
  @Field()
  @IsNotEmpty()
  postId: string;
}
