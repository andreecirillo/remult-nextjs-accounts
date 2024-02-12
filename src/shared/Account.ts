// src/shared/Account.ts

import { Allow, Entity, Fields, Validators, remult } from 'remult'

export enum AccountType {
    Checking = 1,
    Saving = 2
}

@Entity('accounts', {
    allowApiCrud: Allow.authenticated,
})
export class Account {
    @Fields.cuid()
    id = ''

    @Fields.integer<Account>({
        validate: (account) => {
            if (account.number.toString().length < 5) throw "Too short, should have at least 5 digits"
        }
    })
    number = 0

    @Fields.number<Account>({
        validate: (account) => {
            if (account.balance <= 0) throw "Balance invalid"
        }
    })
    balance = 0

    @Fields.object({
        validate: Validators.required
    })
    type = null

    @Fields.createdAt()
    createdAt?: Date
}