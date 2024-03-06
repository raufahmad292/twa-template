import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";
import { useState } from "react";

export function Jetton() {
  const {connected, wallet} = useTonConnect()
  const {mint} = useJettonContract()
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')
  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h3>Jetton</h3>
        <FlexBoxRow>
          Wallet
          <Ellipsis>{ wallet ? Address.parse(wallet as string).toString() : "Loading..."}</Ellipsis>
        </FlexBoxRow>
        <h1>Amount</h1>
        <input type="text" value={amount} onChange={(ev) => setAmount(ev.target.value)}></input>

        <h1>Address</h1>
        <input type="text" value={address} onChange={(ev) => setAddress(ev.target.value)}></input>
        <Button
          disabled={!connected} onClick={()=>mint(amount,address)}>
          Mint jettons
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
