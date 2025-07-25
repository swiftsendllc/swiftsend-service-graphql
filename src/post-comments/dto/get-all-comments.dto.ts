import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAllCommentsInput {
  @Field(() => Int)
  offset: number;
}
