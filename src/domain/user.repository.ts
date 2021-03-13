import User from "./User";

interface UserRepository {
    getByNameOrEmail(nameOrEmail: string): Promise<User>
    comparePasswords(password: string, encodedPassword: string): boolean
    encryptPassword(password: string): string
}

export default UserRepository;