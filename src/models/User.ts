class User {
    constructor(
        public id?              : number,
        public name?            : string,
        public username?        : string,
        public password?        : string,
        public wallet_address?  : string,
        public role?            : string
    )
    {
        this.id                 = id;
        this.name               = name;
        this.username           = username;
        this.password           = password;
        this.wallet_address     = wallet_address;
        this.role               = role;
    }

}

export default User;