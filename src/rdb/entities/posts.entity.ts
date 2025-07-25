import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreatorProfilesEntity } from './creator-profiles.entity';
import { PostAssetsEntity } from './post-assets.entity';
import { PostCommentsEntity } from './post-comments.entity';
import { PostLikesEntity } from './post-likes.entity';
import { PostPurchasesEntity } from './post-purchases.entity';
import { PostSavesEntity } from './post-saves.entity';
import { PostSharesEntity } from './post-shares.entity';
import { PremiumPostUnlocksEntity } from './premium-post-unlocks.entity';

@ObjectType()
@Entity({ name: 'posts' })
export class PostsEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  caption: string;

  @Field()
  @Column()
  creatorId: string;

  @Field()
  @Column()
  isExclusive: boolean;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  unlockPrice: number | null;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  likeCount: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  saveCount: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  shareCount: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  commentCount: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  totalEarning: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Field(() => CreatorProfilesEntity)
  @ManyToOne(() => CreatorProfilesEntity, (creatorProfile) => creatorProfile.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator_id' })
  creatorProfile: CreatorProfilesEntity;

  @Field(() => [PostLikesEntity])
  @OneToMany(() => PostLikesEntity, (postLikes) => postLikes.post, { cascade: true })
  postLikes: PostLikesEntity[];

  @Field(() => [PostAssetsEntity])
  @OneToMany(() => PostAssetsEntity, ({ post }) => post, { cascade: true })
  postAssets: PostAssetsEntity[];

  @Field(() => [PostCommentsEntity])
  @OneToMany(() => PostCommentsEntity, ({ post }) => post, { cascade: true })
  postComments: PostCommentsEntity[];

  @Field(() => [PostPurchasesEntity])
  @OneToMany(() => PostPurchasesEntity, ({ post }) => post, { cascade: true })
  postPurchases: PostPurchasesEntity[];

  @Field(() => [PostSavesEntity])
  @OneToMany(() => PostSavesEntity, ({ post }) => post, { cascade: true })
  postSaves: PostSavesEntity[];

  @Field(() => [PostSharesEntity])
  @OneToMany(() => PostSharesEntity, ({ post }) => post, { cascade: true })
  postShares: PostSharesEntity[];

  @Field(() => [PremiumPostUnlocksEntity])
  @OneToMany(() => PremiumPostUnlocksEntity, (postUnlocks) => postUnlocks.post)
  postUnlocks: PremiumPostUnlocksEntity[];
}
