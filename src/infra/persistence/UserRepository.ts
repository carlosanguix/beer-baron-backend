import User from "../../domain/User";

interface UserRepository {
    getUserByNameOrEmail(nameOrEmail: string): any
    getUserByEmail(email: string): any
    getUserByName(name: string): any
    getUserById(id: string): any
    saveUser(name: string, surname: string, email: string, password: string): any
    comparePasswords(password: string, encodedPassword: string): boolean
    encryptPassword(password: string): string
}

export default UserRepository;