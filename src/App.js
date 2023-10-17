import { useEffect, useState } from "react";
import "./App.css";
import Bridge from "./artifacts/contracts/Bridge.sol/Bridge.json";
import { ethers } from "ethers";

const BridgeContractAddress_ETH = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const BridgeContractAddress_POL = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const BridgeABI = Bridge.abi;

function App() {
  const [contractETH, setContractETH] = useState();
  const [contractPOL, setContractPOL] = useState();

  const get = async (contract) => {
    try {
      const value = await contract.getValue();
      console.log("Value:", value);
    } catch (error) {
      console.error("Error getting value:", error);
    }
  };

  const set = async (contract, newValue, otherContract) => {
    try {
      const tx = await contract.setValue(newValue);
      const receipt = await tx.wait();
      const { events } = receipt;

      if (events) {
        const valueUpdatedEvent = events.find(
          (event) => event.event === "ValueUpdated"
        );
        if (valueUpdatedEvent) {
          const emittedValue = valueUpdatedEvent.args[1].toNumber();
          await otherContract.setValue(emittedValue);
          console.log("Value set successfully on other contract");
        }
      }
    } catch (error) {
      console.error("Error setting value:", error);
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const getContractInstance = async (addr) => {
      try {
        const newContract = new ethers.Contract(addr, BridgeABI, signer);
        return newContract;
      } catch (e) {
        console.log(e);
        return null;
      }
    };

    provider &&
      Promise.all([
        getContractInstance(BridgeContractAddress_ETH),
        getContractInstance(BridgeContractAddress_POL),
      ])
        .then(([contract1, contract2]) => {
          setContractETH(contract1);
          setContractPOL(contract2);
        })
        .catch((error) => console.error("Error deploying contracts:", error));
  }, []);

  return (
    <div>
      <button onClick={() => get(contractETH)}>Get Value ETH</button>
      <button onClick={() => set(contractETH, 123, contractPOL)}>
        Set Value ETH
      </button>
      <button onClick={() => get(contractPOL)}>Get Value POL</button>
      <button onClick={() => set(contractPOL, 456, contractETH)}>
        Set Value POL
      </button>
    </div>
  );
}

export default App;
