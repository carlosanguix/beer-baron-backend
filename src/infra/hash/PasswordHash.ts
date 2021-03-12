export default interface PasswordHash {
    encrypt(password: string): string
    comparePassword(password: string, passwordHashed: string): boolean
}