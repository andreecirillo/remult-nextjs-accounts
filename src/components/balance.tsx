// src/components/todo.tsx

'use client'
import { FormEvent, useEffect, useState } from 'react'
import { remult } from 'remult'
import { Account, AccountType } from '../shared/Account'
import { AccountsController } from '../shared/AccountsController'

const accountRepo = remult.repo(Account)

export default function Todo() {
    const [accounts, setAccounts] = useState<Account[]>([])

    const [newAccountNumber, setAccountNumber] = useState(0)
    const [newAccountBalance, setAccountBalance] = useState(0)
    const [newAccountType, setAccountType] = useState(null)

    const [acountNumberToTransferFunds, setAcountNumberToTransferFunds] = useState(0)
    const [accountNumberToReceiveFunds, setAccountNumberToReceiveFunds] = useState(0)
    const [amountToTransferFunds, setAmountToTransferFunds] = useState(0)

    const addAccount = async (e: FormEvent) => {
        e.preventDefault()

        try {
            await AccountsController.insert(newAccountNumber, newAccountBalance, newAccountType)
            setAccountNumber(0)
            setAccountBalance(0)
            setAccountType(null)
            var radios = document.getElementsByName('type');
            for (var i = 0; i < radios.length; i++) {
                radios[i].checked = false;
            }
        } catch (error) {
            alert((error as { message: string }).message)
        }
    }

    const transferFunds = async (e: FormEvent) => {
        e.preventDefault()

        try {
            await AccountsController.transferFunds(acountNumberToTransferFunds, accountNumberToReceiveFunds, amountToTransferFunds)
            setAcountNumberToTransferFunds(0)
            setAccountNumberToReceiveFunds(0)
            setAmountToTransferFunds(0)
        } catch (error) {
            alert((error as { message: string }).message)
        }
    }

    useEffect(() => {
        return accountRepo
            .liveQuery({
                limit: 20,
                orderBy: { createdAt: "asc" }
            })
            .subscribe(info => setAccounts(info.applyChanges))
    }, [])

    return (
        <div>
            <h1>Accounts</h1>
            <main>
                <form onSubmit={addAccount}>
                    <label>
                        Number
                        <input type="number" value={newAccountNumber} onChange={e => setAccountNumber(e.target.value)} />
                    </label>
                    <label>
                        Balance
                        <input type="number" value={newAccountBalance} onChange={e => setAccountBalance(e.target.value)} />
                    </label>
                    <label>
                        Type
                    </label>
                    <label>
                        {AccountType[AccountType.Checking]}
                        <input type="radio" name="type" value={AccountType.Checking} onChange={e => setAccountType(e.target.value)} />
                    </label>
                    <label>
                        {AccountType[AccountType.Saving]}
                        <input type="radio" name="type" value={AccountType.Saving} onChange={e => setAccountType(e.target.value)} />
                    </label>
                    <button>Add Account</button>
                </form>
                <br />
                <br />
                <form onSubmit={transferFunds}>
                    <label>
                        Account Number to tranfer funds
                        <input type="number" required value={acountNumberToTransferFunds} onChange={e => setAcountNumberToTransferFunds(e.target.value)} />
                    </label>
                    <label>
                        Account Number to receive funds
                        <input type="number" required value={accountNumberToReceiveFunds} onChange={e => setAccountNumberToReceiveFunds(e.target.value)} />
                    </label>
                    <label>
                        Amount to transfer funds
                        <input type="number" required value={amountToTransferFunds} onChange={e => setAmountToTransferFunds(e.target.value)} />
                    </label>
                    <button>Transfer Funds</button>
                </form>
                <br />
                <br />
                {
                    accounts.map((account) => {

                        const deleteAccount = async () => {
                            try {
                                await AccountsController.delete(account.id)
                                setAccounts(accounts.filter(a => a !== account))
                            } catch (error) {
                                alert((error as { message: string }).message)
                            }
                        }

                        return (
                            <div key={account.id}>
                                <label>Number: {account.number}</label>
                                <label>Balance: ${account.balance}</label>
                                <label>Type: {AccountType[account.type]}</label>
                                <button onClick={deleteAccount}>Delete Account</button>
                            </div>
                        )
                    })}
            </main>
        </div>
    )
}