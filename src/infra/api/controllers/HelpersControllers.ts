import { EMAIL_ALREADY_REGISTERED, USERNAME_ALREADY_REGISTERED } from '../../../constants/errorExceptions';

class HelpersControllers {

    public errorsMessages: any = {
        [EMAIL_ALREADY_REGISTERED]: { emailAlreadyRegistered: true },
        [USERNAME_ALREADY_REGISTERED]: { usernameAlreadyRegistered: true },
    };

}

export const helpersControllers: HelpersControllers = new HelpersControllers();