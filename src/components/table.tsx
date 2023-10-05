import React, { useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import NFTContract from "@/utils/ABI/NFTContract.json";

interface TableProps {
  headers: string[];
  NFTAddress: string;
}

const Table: React.FC<TableProps> = ({ headers, NFTAddress }) => {
  const [NFTName, setNFTName] = useState("");
  const [NFTTotalMints, setNFTTotalMints] = useState("");
  const [NFTBalance, setNFTBalance] = useState("");
  const [NFTBalanceInWei, setNFTBalanceInWei] = useState<BigNumber>(BigNumber.from(0));
  const { address } = useAccount();

  const { data: uriData } = useContractRead({
    address: NFTAddress as `0x${string}`,
    abi: NFTContract,
    functionName: "uri",
    args: [0],
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const { data: contractBalance } = useContractRead({
    address: NFTAddress as `0x${string}`,
    abi: NFTContract,
    functionName: "getContractBalance",
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const { data: contractMints } = useContractRead({
    address: NFTAddress as `0x${string}`,
    abi: NFTContract,
    functionName: "counter",
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const { config } = usePrepareContractWrite({
    address: NFTAddress as `0x${string}`,
    abi: NFTContract,
    functionName: "withdraw",
    args: [NFTBalanceInWei, address],
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const { writeAsync, error, isSuccess } = useContractWrite(config);

  useEffect(() => {
    if (uriData) {
      fetch(uriData as string)
        .then((response) => response.json())
        .then((data) => {
          setNFTName(data.name);
        });
    }
  }, [uriData]);

  useEffect(() => {
    if (contractMints) {
      setNFTTotalMints(contractMints.toString());
    }
  }, [contractMints]);

  useEffect(() => {
    if (contractBalance) {
      setNFTBalanceInWei(contractBalance as any);
      setNFTBalance(utils.formatEther(contractBalance as any));
    }
  }, [contractBalance]);

  return (
    <tbody className="capitalize divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
      <tr>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
          <div className="font-medium text-gray-800 dark:text-white">
            {NFTName}
          </div>
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="text-gray-700 dark:text-gray-200">
            {NFTTotalMints ? NFTTotalMints : "0"}
          </div>
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="text-gray-700 dark:text-gray-200">
            {NFTBalance ? NFTBalance : "0"}
          </div>
        </td>
        <td className="px-1 py-4 text-sm whitespace-nowrap">
          <div className="text-gray-700 dark:text-gray-200">
            <button
              className="bg-[#9FF3FF] hover:bg-[#94e2ee] text-gray-700 font-bold py-2 px-4 rounded-full drop-shadow-lg inline-flex items-center"
              onClick={() => {
                writeAsync?.();
              }}
            >
              Claim
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default Table;
