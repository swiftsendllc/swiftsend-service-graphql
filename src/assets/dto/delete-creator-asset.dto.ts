import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteCreatorAsset {
  @Field()
  assetId: string;
}
