// src/shared/AccountsController.ts

import { Allow, BackendMethod, remult } from "remult"
import { Account } from "./Account"

export class AccountsController {

    @BackendMethod({ allowed: Allow.authenticated })
    static async insert(number: number, balance: number, type: any) {
        const accountRepo = remult.repo(Account)

        const count = await accountRepo.count({ number: number })

        if (count === 1)
            throw "Existing Account Number"

        await accountRepo.insert({ number: number, balance: balance, type: type })
    }

    @BackendMethod({ allowed: Allow.authenticated })
    static async transferFunds(acountNumberToTransferFunds: number, acountNumberToReceiveFunds: number, amountToTransferFunds: number) {

        if (amountToTransferFunds <= 0)
            throw "Invalid amount"

        const accountRepo = remult.repo(Account)

        const accountToTransferFunds = await accountRepo.findFirst({ number: acountNumberToTransferFunds })

        if (accountToTransferFunds === undefined)
            throw "Account to transfer funds not found"

        const accountToReceiveFunds = await accountRepo.findFirst({ number: acountNumberToReceiveFunds })

        if (accountToReceiveFunds === undefined)
            throw "Account to transfer funds not found"

        if (accountToTransferFunds.number === accountToReceiveFunds.number)
            throw "Can't tranfer funds to same account"

        const newAccountToTranferFundsBalance = accountToTransferFunds.balance - Number(amountToTransferFunds)

        if (newAccountToTranferFundsBalance < 0)
            throw "Not enough money to transfer funds"

        const newAccountToReceiveFundsBalance = accountToReceiveFunds.balance + Number(amountToTransferFunds)

        await accountRepo.save({ ...accountToTransferFunds, balance: newAccountToTranferFundsBalance })
        await accountRepo.save({ ...accountToReceiveFunds, balance: newAccountToReceiveFundsBalance })
    }

    @BackendMethod({ allowed: Allow.authenticated })
    static async delete(id: string) {
        const accountRepo = remult.repo(Account)
        await accountRepo.delete(id)
    }
}