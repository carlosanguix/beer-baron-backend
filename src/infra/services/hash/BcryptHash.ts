import PasswordHash from "./PasswordHash";
import bcrypt from 'bcrypt';

class BcryptHash implements PasswordHash {
    encrypt(password: string): string {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    }
    
    comparePassword(password: string, passwordHashed: string): boolean {
        console.log(password, passwordHashed);
        return bcrypt.compareSync(password, passwordHashed);
    }
}

export default BcryptHash;