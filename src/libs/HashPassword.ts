import { hashSync, compareSync } from 'bcrypt';

class HashPassword
{
    constructor() {}

    static hash(password: String)
    {
        let saltRound = 10;
        let hash = hashSync(password, saltRound);

        return hash;
    }

    static compare(password: String, hash: string)
    {
        return compareSync(password, hash);
    }
}

export default HashPassword;