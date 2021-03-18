import UserRepositoryMock from '../../__mocks__/UserRepositoryMock';
import { makeGetUserData } from '../../src/application/useCases/getUserData';
import fakeData from '../../__mocks__/fakeData';

describe('getUserData useCase', () => {

    let getUserData: any;

    beforeAll(() => {
        getUserData = makeGetUserData(new UserRepositoryMock(fakeData));
    });

    it('should retrieve an user with id "2"', async () => {
        const userId = '2';
        const user = await getUserData(userId);
        expect(user.name).toBe('Pepe');
    });

    it('should throw an error with id "3"', async () => {
        const userId = '3';
        await expect(getUserData(userId))
            .rejects
            .toThrow('No user found with that id');
    });

});