import { useEffect, useState } from "react";
import "./App.css";
import Bridge from "./artifacts/contracts/Bridge.sol/Bridge.json";
import { ethers } from "ethers";

const SEPOLIA_CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const MUMBAI_CONTRACT_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

function App() {
  const [contract, setContract] = useState(); // deploy two instances , rest is done

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const getContractInstance = async (addr) => {
      try {
        const newContract = new ethers.Contract(addr, Bridge.abi, signer);
        setContract(newContract);
        console.log(newContract);
      } catch (e) {
        console.log(e);
      }
    };
    provider && getContractInstance(SEPOLIA_CONTRACT_ADDRESS);
    provider && getContractInstance(MUMBAI_CONTRACT_ADDRESS);
  }, []);

  const get = async () => {
    const name = await contract.getValue();
    const receipt = await name.wait();
    console.log("Tx", receipt);
    receipt &&
      contract.on("ValueRetrieved", (a, b, c, d) => {
        console.log(a, b, c, d);
      });
  };

  const set = async () => {
    const name = await contract.setValue(69);
    const receipt = await name.wait();
    console.log(receipt);
    receipt &&
      contract.on("ValueUpdated", (a, b, c, d) => {
        console.log(a, b, c, d);
        console.log("Updating on the other contract.");
      });
    setOther();
  };

  const setOther = async () => {
    const name = await contract.setValue(69);
    const receipt = await name.wait();
    console.log(receipt);
    receipt &&
      contract.on("ValueUpdated", (a, b, c, d) => {
        console.log(a, b, c, d);
      });
  };

  return (
    <div className="App">
      <h1>Bridge Implementation!!!</h1>
      <button onClick={get}>Get Name</button>
      <button onClick={set}>Set Name</button>
    </div>
  );
}

export default App;
