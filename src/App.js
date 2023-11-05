// import Swapper from "./artifacts/contracts/Swapper.sol/Swapper.json";
// import Auth from "./artifacts/contracts/Auth.sol/Auth.json";
import Manager from "./artifacts/contracts/Manager.sol/Manager.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Admin from "./pages/Admin";
import Upload from "./pages/Upload";
import Navbar from "./layout/Navbar";
import Welcome from "./pages/Welcome";
import Swap from "./pages/Swap";

// const SWAPPER_CONTRACT = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
// const AUTH_CONTRACT = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const MANAGER_CONTRACT = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
  const [managerContract, setManagerContract] = useState();
  const [tokenPool, setTokenPool] = useState([]);

  const getTokenPool = async () => {
    try {
      const tx = await managerContract.getTokenPool();
      setTokenPool(tx);
    } catch (e) {
      console.log(e);
    }
  };

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
        setManagerContract(newContract);
      } catch (e) {
        console.log(e);
        return null;
      }
    };

    provider && getContractInstance();
    getTokenPool();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/manage"
          element={<Admin managerContract={managerContract} />}
        />
        <Route
          path="/upload"
          element={
            <Upload
              managerContract={managerContract}
              tokenPool={tokenPool}
              getTokenPool={getTokenPool}
            />
          }
        />
        <Route path="/swap" element={<Swap />} />
      </Routes>
    </Router>
  );
}

export default App;
