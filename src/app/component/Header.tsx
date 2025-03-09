"use client";
import {
  ConnectButton,
  useWallet,
} from '@razorlabs/razorkit';
import Image from "next/image";
import { FaChevronDown, FaWallet } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chainName, setChainName] = useState<string | null>(null);
  const { connected, chain, changeNetwork } = useWallet();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNetworkChange = async (networkId: number) => {
    if (!connected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      await changeNetwork(networkId);
      setChainName(networkId === 126 ? 'Mainnet' : 'Bardock Testnet');
      setDropdownOpen(false);
    } catch (error) {
      console.error('Failed to change network:', error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    if (chain) {
      setChainName(chain.name);
    }
  }, [chain]);

  return (
    <header className="w-full max-w-2xl flex justify-between items-center py-6 mb-10">
      <h1 className="flex items-center text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        <Image width={48} height={48} src={"/image/mosaic.avif"} alt="Move" className="rounded-full mr-2" />
        Mosaic
      </h1>
      <div className="flex items-center space-x-4">
        <div className="relative" ref={dropdownRef}>
          <div className="relative group">
            <div
              className="text-sm flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Image
                width={24}
                height={24}
                src="/image/MOVE.png"
                alt="Move Token"
                className="w-6 h-6 rounded-full"
              />
              <span>{chainName || 'Select Network'}</span>
              <FaChevronDown className="text-gray-400 text-xs" />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                <ul className="py-1 text-gray-300">
                  <li
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleNetworkChange(126)}
                  >
                    Mainnet
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleNetworkChange(250)}
                  >
                    Bardock Testnet
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <ConnectButton
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg font-medium hover:from-yellow-400 hover:to-yellow-500 transition shadow-lg flex items-center justify-center gap-2"
          onConnectSuccess={(name) => {
            console.log('connect success: ', name);
          }}
        >
          <FaWallet />
          Connect Wallet
        </ConnectButton>
      </div>
    </header>
  );
};