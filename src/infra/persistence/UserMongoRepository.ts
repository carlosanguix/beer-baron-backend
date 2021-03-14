import UserRepository from "./UserRepository";
import User from "../../domain/User";
import userModel from '../database/models/user.model';
import BcryptHash from "../services/hash/BcryptHash";
import PasswordHash from "../services/hash/PasswordHash";

class UserMongoRepository implements UserRepository {

    private passwordHash: PasswordHash;

    constructor() {
        this.passwordHash = new BcryptHash();
    }
    
    public async getUserByNameOrEmail(nameOrEmail: string): Promise<User> {
        const userByName:  User = await this.getUserByName(nameOrEmail);
        const userByEmail: User = await this.getUserByEmail(nameOrEmail);
        return userByName || userByEmail;
    }

    public async saveUser(name: string, surname: string, email: string, password: string): Promise<boolean> {
        try {
            const user = new userModel({
                name,
                surname,
                email,
                password
            });
            await user.save();
            return true;
        }
        catch(e) {
            console.log(e.message);
            return false;
        }
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await userModel.findOne({ email });
    }
    
    public async getUserByName(name: string): Promise<User> {
        return await userModel.findOne({ name });
    }

    public async getUserById(id: string): Promise<User> {
        return await userModel.findOne({ _id: id });
    }
    
    public comparePasswords(password: string, encodedPassword: string): boolean {
        return this.passwordHash.comparePassword(password, encodedPassword);
    }

    public encryptPassword(password: string): string {
        return this.passwordHash.encrypt(password);
    }
}

export default UserMongoRepository;