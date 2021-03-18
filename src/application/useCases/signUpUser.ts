import UserRepository from "../../infra/persistence/UserRepository";
import UserMongoRepository from "../../infra/persistence/UserMongoRepository";
import { 
    EMAIL_ALREADY_REGISTERED,
    USERNAME_ALREADY_REGISTERED,
    PASSWORDS_DOES_NOT_MATCH
} from '../../constants/errorExceptions';

export const createSignUp = (
    userRepository: UserRepository
) => async (name: string, email: string, password: string, passwordMatch: string) => {

    if (password !== passwordMatch) {
        throw new Error(PASSWORDS_DOES_NOT_MATCH);
    }

    const userExistsWithName  = await userRepository.getUserByName(name);
    if (userExistsWithName) {
        throw new Error(USERNAME_ALREADY_REGISTERED);
    }

    const userExistsWithEmail = await userRepository.getUserByEmail(email);
    if (userExistsWithEmail) {
        throw new Error(EMAIL_ALREADY_REGISTERED);
    }

    const encryptedPassword = userRepository.encryptPassword(password);
    return await userRepository.saveUser(name, email, encryptedPassword);
};

const sinUpUser = createSignUp(new UserMongoRepository());

export default sinUpUser;