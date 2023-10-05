import React from "react";
import { BigNumber, utils } from "ethers";

interface TableProps {
  headers: string[];
  data: {
    name: string;
    mintCount?: number;
    reward?: string;
    tokenAddress: string;
  }[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className="min-w-full divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              scope="col"
              className="capitalize px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="capitalize divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
        {data.map((i, index) => (
          <tr key={index}>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <div className="font-medium text-gray-800 dark:text-white">
                {i.name}
              </div>
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
              <div className="text-gray-700 dark:text-gray-200">
                {utils.formatEther(BigNumber.from(i.mintCount ?? "0"))}
              </div>
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
              <div className="text-gray-700 dark:text-gray-200">
                {utils.formatEther(BigNumber.from(i.reward ?? "0"))}
              </div>
            </td>
            <td className="px-1 py-4 text-sm whitespace-nowrap">
              <div className="text-gray-700 dark:text-gray-200">
                <button
                  className="bg-[#9FF3FF] hover:bg-[#94e2ee] text-gray-700 font-bold py-2 px-4 rounded-full drop-shadow-lg inline-flex items-center"
                  onClick={() => {}}
                >
                  Claim
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
