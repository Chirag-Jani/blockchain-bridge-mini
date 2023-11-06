import Swapper from "./artifacts/contracts/Swapper.sol/Swapper.json";
import AuthContract from "./artifacts/contracts/Auth.sol/Auth.json";
import Manager from "./artifacts/contracts/Manager.sol/Manager.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Admin from "./pages/Admin";
import Upload from "./pages/Upload";
import Navbar from "./layout/Navbar";
import Welcome from "./pages/Welcome";
import Swap from "./pages/Swap";
import Auth from "./pages/Auth";

const MANAGER_CONTRACT = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const SWAPPER_CONTRACT = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const AUTH_CONTRACT = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [managerContract, setManagerContract] = useState();
  const [swapperContract, setSwapperContract] = useState();
  const [authContract, setAuthContract] = useState();
  const [tokenPool, setTokenPool] = useState([]);

  const getTokenPool = async () => {
    try {
      const tx = await managerContract.getTokenPool();
      setTokenPool(tx);
    } catch (e) {
      console.log(e);
    }
  };

  const checkCurrentAccount = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request access to the user's accounts
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Create an ethers provider using MetaMask's provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer (connected account)
        const signer = provider.getSigner();

        // Get the current connected account
        const account = await signer.getAddress();

        setCurrentAccount(account);
      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Error checking current account:", error);
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const getContractInstance = async (addr, abi, settter) => {
      try {
        const newContract = new ethers.Contract(addr, abi, signer);
        console.log("Contract: ", newContract);
        settter(newContract);
        checkCurrentAccount();
      } catch (e) {
        console.log(e);
        return null;
      }
    };

    provider &&
      getContractInstance(MANAGER_CONTRACT, Manager.abi, setManagerContract) &&
      getContractInstance(SWAPPER_CONTRACT, Swapper.abi, setSwapperContract);
    getContractInstance(AUTH_CONTRACT, AuthContract.abi, setAuthContract);
    getTokenPool();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Auth authContract={authContract} currentAccount={currentAccount} />
          }
        />
        <Route path="/home" element={<Welcome />} />
        <Route
          path="/manage"
          element={
            <Admin
              managerContract={managerContract}
              currentAccount={currentAccount}
            />
          }
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
        <Route
          path="/swap"
          element={
            <Swap
              tokenPool={tokenPool}
              getTokenPool={getTokenPool}
              SWAPPER_CONTRACT={SWAPPER_CONTRACT}
              currentAccount={currentAccount}
              swapperContract={swapperContract}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
