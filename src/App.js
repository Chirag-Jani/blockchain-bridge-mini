import Manager from "./artifacts/contracts/Manager.sol/Manager.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const MANAGER_CONTRACT = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [contract, setContract] = useState();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const getContractInstance = async (addr) => {
      try {
        const newContract = new ethers.Contract(
          MANAGER_CONTRACT,
          Manager.abi,
          signer
        );
        console.log("Contract: ", newContract);
        setContract(newContract);
      } catch (e) {
        console.log(e);
        return null;
      }
    };

    provider && getContractInstance();
  }, []);

  return (
    <div className="App">
      <h1>Hellow World</h1>
    </div>
  );
}

export default App;
