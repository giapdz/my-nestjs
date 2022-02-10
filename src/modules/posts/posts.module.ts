import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { PostRepository } from './posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostRepository])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
