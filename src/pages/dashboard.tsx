import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import Table from "@/components/table";
import { useAccount, useContractRead } from "wagmi";
import { xdcMainnetContractAddress } from "@/utils/constants";
import NFTContractFactory from "@/utils/ABI/NFTContractFactory.json";

type CardProps = {
  heading: string;
  title: string;
  img: string;
  link: string;
  color: string;
  style: string;
};

const headers = ["Name", "Total Mints", "Reward Amount (in XDC)", ""];

const Card = ({ heading, title, img, link, color, style }: CardProps) => {
  return (
    <div className="w-[90%] md:w-1/3 flex flex-col">
      <h1 className="text-[#9f9f9f] font-bold text-sm pl-5 pb-3 dark:text-[#605e8a]">
        {heading}
      </h1>
      <Link
        href={link}
        className={`flex items-center rounded-[30px] overflow-hidden shadow-lg  min-h-[100px] md:min-h-[150px] ${color}`}
      >
        <div className="px-6 py-4">
          <div className={`font-extrabold text-xl mb-2 text-center ${style}`}>
            {title}
          </div>
        </div>
        <div className="flex mx-auto justify-center w-[100%]">
          <Image
            src={img}
            width="100"
            height="100"
            alt="Icon"
            className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300"
          />
        </div>
      </Link>
    </div>
  );
};

const Dashboard = () => {
  const [NFTAddresses, setNFTAddresses] = useState<string[]>([]);

  const { address } = useAccount();

  const { data, isError, isLoading } = useContractRead({
    address: xdcMainnetContractAddress as `0x${string}`,
    abi: NFTContractFactory,
    functionName: "getNFTsWithMetadataCreatedByCreator",
    args: [address],
    onSuccess: (data) => {
      console.log("Succes");
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const fetchData = async () => {
    let nfts = [];
    for (let nft of data as any) {
      nfts.push(nft.nftAddress);
      console.log(nft.nftAddress);
    }
    setNFTAddresses(nfts);
  };

  useEffect(() => {
    if (data) {
      fetchData();
    }
  }, [data]);

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="tokenverse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full pl-[80px] lg:pl-0 pb-10 md:pr-5">
        <div className="flex space-x-2 items-center mb-10 justify-center md:justify-start">
          <MdSpaceDashboard size={20} className="dark:text-[#9FF3FF]" />
          <h1 className="text-[#1e1e1e] font-semibold text-xl dark:text-[#9FF3FF]">
            DASHBOARD
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-4 md:space-y-0 md:items-start md:justify-start">
          <Card
            heading="CREATE A NFT MEMBERSHIPS"
            link="/nft"
            title="NFT COLLECTION"
            img="/NFT.png"
            style="text-[#131619]"
            color="bg-gradient-to-r from-[#FFDC9A] to-[#FFBFAB]"
          />
          <Card
            heading="SHIP XRC1155 TO ATTENDEES"
            link="/airdrop"
            title="AIRDROP NFTs"
            img="/airdrop.png"
            style="text-gray-700"
            color="bg-gradient-to-r from-[#9FF3FF] to-[#FFE5E8]"
          />
        </div>
        <div className="mt-12">
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
            {NFTAddresses.map((nftAddress, index) => (
              <Table key={index} headers={headers} NFTAddress={nftAddress} />
            ))}
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
