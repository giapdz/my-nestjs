import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/createUser.dto';
describe('UsersService', () => {
  let usersService: UsersService;
  let findOne: jest.Mock;
  let create: jest.Mock;
  let save: jest.Mock;
  beforeEach(async () => {
    findOne = jest.fn();
    create = jest.fn();
    save = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne,
            create,
            save,
          },
        },
      ],
    }).compile();
    usersService = await module.get(UsersService);
  });

  describe('when getting a user by email', () => {
    describe('and user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      it('should return user', async () => {
        const fetchedUser = await usersService.getByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('and user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(
          usersService.getByEmail('test@test.com'),
        ).rejects.toThrow();
      });
    });
  });

  describe('when getting a user by id', () => {
    const userId = 1;
    describe('and user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      it('should return user', async () => {
        const fetchedUser = await usersService.getById(userId);
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('and user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw new error', async () => {
        await expect(usersService.getById(userId)).rejects.toThrow();
      });
    });
  });

  describe('when creating a user', () => {
    const newUser: CreateUserDto = {
      email: 'test@test.com',
      name: 'test',
      password: 'test123',
    };
    beforeEach(() => {
      create.mockReturnValue(Promise.resolve(newUser));
      save.mockReturnValue(Promise.resolve(newUser));
    });
    it('should return new user', async () => {
      const createUser = await usersService.create(newUser);
      expect(createUser).toEqual(newUser);
    });
  });
});
