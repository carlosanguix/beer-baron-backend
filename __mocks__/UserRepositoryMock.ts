import UserRepository from '../src/infra/persistence/UserRepository';

class UserRepositoryMock implements UserRepository {

    public fakeData: any[];

    constructor(fakeData: any[]) {
        this.fakeData = fakeData; 
    }

    getUserByNameOrEmail(nameOrEmail: string): object {
        return this.fakeData.find(user => user.name === nameOrEmail || user.email === nameOrEmail);
    }

    getUserByEmail(email: string) {
        return this.fakeData.find(user => user.email === email);
    }

    getUserByName(name: string) {
        return this.fakeData.find(user => user.name === name);
    }
    
    getUserById(id: string) {
        return this.fakeData.find(user => user.id === id);
    }
    
    saveUser(name: string, email: string, password: string) {
        this.fakeData.push({ name, email, password });
        return true;
    }

    comparePasswords(password: string, encodedPassword: string): boolean {
        return password === encodedPassword;
    }

    encryptPassword(password: string): string {
        return password;
    }

}

export default UserRepositoryMock;