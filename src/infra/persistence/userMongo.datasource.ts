import UserRepository from "../../domain/user.repository";
import User from "../../domain/User";
import userModel from '../database/models/user.model';
import BcryptHash from "../services/hash/BcryptHash";
import PasswordHash from "../services/hash/PasswordHash";

class UserMongo implements UserRepository {

    private passwordHash: PasswordHash;

    constructor() {
        this.passwordHash = new BcryptHash();
    }
    
    public async getByNameOrEmail(nameOrEmail: string): Promise<User> {
        console.log(nameOrEmail);
        const userByName:  User = await userModel.findOne({ name: nameOrEmail });
        const userByEmail: User = await userModel.findOne({ email: nameOrEmail });
        return userByName || userByEmail;
    }
    
    public comparePasswords(password: string, encodedPassword: string): boolean {
        return this.passwordHash.comparePassword(password, encodedPassword);
    }

    public encryptPassword(password: string): string {
        return this.passwordHash.encrypt(password);
    }
}

export default UserMongo;