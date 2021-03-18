import UserRepositoryMock from '../../__mocks__/UserRepositoryMock';
import { makeSignInUser } from '../../src/application/useCases/signInUser';
import fakeData from '../../__mocks__/fakeData';
import { 
    PASSWORD_INCORRECT,
    NO_USER_FOUND
} from '../../src/constants/errorExceptions';

describe('signInUser useCase', () => {

    let signInUser: any;

    beforeAll(() => {
        signInUser = makeSignInUser(new UserRepositoryMock(fakeData));
    });

    it('should logging in correctly', async () => {
        const userID = await signInUser('Pepe', '1234');
        expect(userID).toBe('2');
    });

    it('should fail logging in with incorrect password', async () => {
        await expect(() => signInUser('Pepe', '4321'))
            .rejects
            .toThrow(PASSWORD_INCORRECT);
    });
        
    it('should fail logging in with username "Juan"', async () => {
        await expect(() => signInUser('Juan', '32432'))
            .rejects
            .toThrow(NO_USER_FOUND);
    });

});