import User from "./User";

interface UserRepository {
    getByNameOrEmail(nameOrEmail: string): Promise<User>
    getUserByEmail(email: string): Promise<User>
    getUserByName(name: string): Promise<User>
    saveUser(name: string, surname: string, email: string, password: string): Promise<boolean>
    comparePasswords(password: string, encodedPassword: string): boolean
    encryptPassword(password: string): string
}

export default UserRepository;