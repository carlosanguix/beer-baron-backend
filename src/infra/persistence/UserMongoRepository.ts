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
    
    public async getByNameOrEmail(nameOrEmail: string): Promise<User> {
        console.log(nameOrEmail);
        const userByName:  User = await userModel.findOne({ name: nameOrEmail });
        const userByEmail: User = await userModel.findOne({ email: nameOrEmail });
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
    
    public comparePasswords(password: string, encodedPassword: string): boolean {
        return this.passwordHash.comparePassword(password, encodedPassword);
    }

    public encryptPassword(password: string): string {
        return this.passwordHash.encrypt(password);
    }
}

export default UserMongoRepository;