import UserRepositoryMock from '../../__mocks__/UserRepositoryMock';
import { createSignUp } from '../../src/application/useCases/signUpUser';
import fakeData from '../../__mocks__/fakeData';

describe('signInUser useCase', () => {

    let repository: UserRepositoryMock;
    let signUpUser: any;

    beforeAll(() => {
        repository = new UserRepositoryMock(fakeData);
        signUpUser = createSignUp(repository);
    });

    it('should sign up correctly', async () => {
        const correctlyRegistered = await signUpUser(
            'Jose',
            'Garcia',
            'jose@gmail.com',
            'pass',
            'pass'
        );
        expect(correctlyRegistered).toBe(true);
        const lastUserRegistered = repository.fakeData.pop();
        expect(lastUserRegistered.name).toBe('Jose');
    });

    it('should fail registering with different passwords', async () => {
        await expect(() => signUpUser('Jose', 'Garcia', 'jose@gmail.com', 'pass1', 'pass2'))
            .rejects
            .toThrow('The passwords does not match');
    });
    
    it('should fail registering with an username already registered', async () => {
        await expect(() => signUpUser('Pepe', 'Garcia', 'jose@gmail.com', 'pass', 'pass'))
            .rejects
            .toThrow('That username is already registered');
    });

    it('should fail registering with an email already registered', async () => {
        await expect(() => signUpUser('Pedro', 'Garcia', 'pepe@gmail.com', 'pass', 'pass'))
            .rejects
            .toThrow('That email is already registered');
    });

});