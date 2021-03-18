import UserRepositoryMock from '../../__mocks__/UserRepositoryMock';
import { createSignUp } from '../../src/application/useCases/signUpUser';
import fakeData from '../../__mocks__/fakeData';
import { 
    EMAIL_ALREADY_REGISTERED,
    USERNAME_ALREADY_REGISTERED, 
    PASSWORDS_DOES_NOT_MATCH 
} from '../../src/constants/errorExceptions';

describe('signUpUser useCase', () => {

    let repository: UserRepositoryMock;
    let signUpUser: any;

    beforeAll(() => {
        repository = new UserRepositoryMock(fakeData);
        signUpUser = createSignUp(repository);
    });

    it('should sign up correctly', async () => {
        const correctlyRegistered = await signUpUser(
            'Jose',
            'jose@gmail.com',
            'pass',
            'pass'
        );
        expect(correctlyRegistered).toBe(true);
        const lastUserRegistered = repository.fakeData.pop();
        expect(lastUserRegistered.name).toBe('Jose');
    });

    it('should fail registering with different passwords', async () => {
        await expect(() => signUpUser('Jose', 'jose@gmail.com', 'pass1', 'pass2'))
            .rejects
            .toThrow(PASSWORDS_DOES_NOT_MATCH);
    });
    
    it('should fail registering with an username already registered', async () => {
        await expect(() => signUpUser('Pepe', 'jose@gmail.com', 'pass', 'pass'))
            .rejects
            .toThrow(USERNAME_ALREADY_REGISTERED);
    });

    it('should fail registering with an email already registered', async () => {
        await expect(() => signUpUser('Pedro', 'pepe@gmail.com', 'pass', 'pass'))
            .rejects
            .toThrow(EMAIL_ALREADY_REGISTERED);
    });

});