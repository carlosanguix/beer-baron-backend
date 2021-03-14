import UserRepository from "../../infra/persistence/UserRepository";
import UserMongoRepository from "../../infra/persistence/UserMongoRepository";

const createSignUp = (
    userRepository: UserRepository
) => async (name: string, surname: string, email: string, password: string, passwordMatch: string) => {

    if (password !== passwordMatch) {
        throw new Error('The passwords does not match.');
    }

    const userExistsWithName  = await userRepository.getUserByName(name);
    const userExistsWithEmail = await userRepository.getUserByEmail(email);

    if (userExistsWithName || userExistsWithEmail) {
        throw new Error('User already exists with the same name or email.');
    }

    const encryptedPassword = userRepository.encryptPassword(password);
    return await userRepository.saveUser(name, surname, email, encryptedPassword);
};

const sinUpUser = createSignUp(new UserMongoRepository());

export default sinUpUser;