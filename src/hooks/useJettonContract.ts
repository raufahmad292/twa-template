import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import {Mint, SampleJetton} from "../../build/SampleJetton/tact_SampleJetton";
import {JettonDefaultWallet} from "../../build/SampleJetton/tact_JettonDefaultWallet";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { send } from "vite/dist/node";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useJettonContract() {
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()
    const [balance, setBalance] = useState<string | null>()
    return {
        balance: balance,
        mint: (amount:any,address:any) =>
         {
            
                if(!client || !wallet) 
                return;
                const contract = SampleJetton.fromAddress(Address.parse(address))
                const jettonContract =client.open(contract) as OpenedContract<SampleJetton>
           
        

            console.log(amount,address)
            const message: Mint = {
                $$type: "Mint",
                amount: 150n
            }
            let numberAmount =parseFloat(amount)
            let amountToSend = (numberAmount*0.1)/100
            let s =amountToSend.toFixed(5)
            console.log(s)
            jettonContract?.send(sender, {
                value: toNano(s)
            }, message)
        }
    }
}