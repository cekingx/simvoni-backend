interface Election {
    id?                     : number;
    name                    : string;
    description             : string;
    election_authority      : string | number;
    start                   : string;
    end                     : string;
    status?                 : string;
    contract_address?       : string;
}

export default Election;