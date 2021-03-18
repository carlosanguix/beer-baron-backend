import UserRepository from "../../infra/persistence/UserRepository";
import UserMongoRepository from "../../infra/persistence/UserMongoRepository";

export const createSignUp = (
    userRepository: UserRepository
) => async (name: string, email: string, password: string, passwordMatch: string) => {

    if (password !== passwordMatch) {
        throw new Error('The passwords does not match');
    }

    const userExistsWithName  = await userRepository.getUserByName(name);
    if (userExistsWithName) {
        throw new Error('That username is already registered');
    }

    const userExistsWithEmail = await userRepository.getUserByEmail(email);
    if (userExistsWithEmail) {
        throw new Error('That email is already registered');
    }

    const encryptedPassword = userRepository.encryptPassword(password);
    return await userRepository.saveUser(name, email, encryptedPassword);
};

const sinUpUser = createSignUp(new UserMongoRepository());

export default sinUpUser;