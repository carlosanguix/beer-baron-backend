import UserRepository from "../../infra/repositories/user.repository";
import UserMongo from "../dataSources/userMongo.datasource";
import User from "../entities/User";

const signInUser = (
    userRepository: UserRepository
) => async (userNameOrEmail: string, password: string) => {
    const user: User = await userRepository.getByNameOrEmail(userNameOrEmail);
    
    if (!user) {
        throw new Error('Not found');
    }

    if (!userRepository.comparePasswords(password, user.password)) {
        throw new Error('Incorrect password');
    }

    const userFormatted = {
        name: user.name,
        surname: user.surname,
        email: user.email,
    };

    return userFormatted;
};

const signInUserWithRepository = signInUser(new UserMongo());

export default signInUserWithRepository;