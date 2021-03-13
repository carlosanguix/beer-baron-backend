import UserRepository from "../../../domain/user.repository";
import UserMongo from "../../../infra/persistence/userMongo.datasource";

const signUpUser = (
    userRepository: UserRepository
) => async (name: string, surname: string, email: string, password: string, passwordMatch: string) => {
    console.log({ name, surname, email, password, passwordMatch });

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

const signUpUserWithRepository = signUpUser(new UserMongo());

export default signUpUserWithRepository;