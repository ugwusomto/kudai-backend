import { AccessControl } from "accesscontrol";

let GrantObject = {
    ADMIN: {
        users: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        },
        accounts: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        },
        transactions: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        },
        loans: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        }
    },
    EDITOR: {
        users: {
            'create:own': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:own': ['*'],
        },
        accounts: {
            'create:own': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:own': ['*'],
        },
        transactions: {
            'create:own': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:own': ['*'],
        }
    },
    CUSTOMER: {
        users: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*'],
        },
        accounts: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*'],
        },
        transactions: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*'],
        }
    }
}

const Permissions = new AccessControl(GrantObject);
export default Permissions;