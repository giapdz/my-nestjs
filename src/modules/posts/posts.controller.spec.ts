import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import httpMocks from 'node-mocks-http';
import { Request } from 'express';

describe('PostsController', () => {
  let controller: PostsController;
  const post1 = {
    id: 1,
    title: 'test',
    content: 'this is a test',
  };
  const post2 = {
    id: 2,
    title: 'test 2',
    content: 'this is a test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            getAllPosts: jest.fn().mockReturnValue([post1, post2]),
            getPostById: jest.fn().mockReturnValue(post1),
            createPost: jest.fn().mockReturnValue(post1),
            updatePost: jest.fn().mockReturnValue(post2),
            deletePost: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when get all post', () => {
    it('should get the list of cats', async () => {
      const retPosts = await controller.getAllPosts();
      expect(typeof retPosts).toBe('object');
      expect(retPosts[0].id).toBe(1);
      expect(retPosts[1].title).toBe('test 2');
      expect(retPosts.length).toBe(2);
    });
  });

  describe('when get post by id', () => {
    it('should get the post matching the id', async () => {
      const retPost = await controller.getPostById({ id: '1' });
      expect(typeof retPost).toBe('object');
      expect(retPost.id).toBe(1);
      expect(retPost.title).toBe('test');
    });
  });

  describe('when create new post', () => {
    const author = {
      user: new User(),
    } as RequestWithUser;
    it('should return a new post', async () => {
      const returndPost = await controller.createPost(
        {
          title: 'test',
          content: 'this is a test',
        },
        author,
      );
      expect(returndPost.id).toBe(1);
      expect(returndPost.title).toBe('test');
    });
  });

  describe('when update a post', () => {
    it('should return a updated post', async () => {
      const upPost = await controller.updatePost(
        { id: '1' },
        {
          id: 2,
          title: 'test 2',
          content: 'this is a test',
        },
      );
      expect(typeof upPost).toBe('object');
      expect(upPost.title).toBe('test 2');
    });
  });
  describe('when delete post', () => {
    it('should return true that there was a deletion', () => {
      const delReturn = controller.deletePost({ id: '1' });
      expect(typeof delReturn).toBe('object');
      expect(delReturn);
    });
  });
});
