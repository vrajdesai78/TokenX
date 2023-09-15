import Head from "next/head";
import Grid from "@mui/material/Grid";
import NFT from "@/components/nftCard";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { optimismContractAddress, zoraContractAddress, baseContractAddress, modeContractAddress } from "@/utils/constants";
import NFTContractFactory from "@/utils/ABI/NFTContractFactory.json";
import { useAccount, useContractRead, useNetwork } from "wagmi";

export default function Products() {
  const [productData, setProductData] = useState([{}]);
  const { address } = useAccount();

  const { chain } = useNetwork();
  const [contractAddress, setContractAddress] = useState("");

  useEffect(() => {
    console.log(chain?.name)
    if (chain?.name === 'Optimism Goerli') {
      setContractAddress(optimismContractAddress);
    } 
    else if (chain?.name === 'Base Goerli') {
      setContractAddress(baseContractAddress);
    }
    else if (chain?.name === 'Zora Goerli Testnet') {
      setContractAddress(zoraContractAddress);
    }
    else if (chain?.name === 'Mode Testnet') {
      setContractAddress(modeContractAddress);
    }
  }, [chain])

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress as `0x${string}`,
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
      const response = await fetch(nft.uri);
      const pd = await response.json();
      nfts.push({
        name: pd.name,
        description: pd.description,
        image: pd.image,
        price: parseFloat(nft.nftPrice),
        nftAddress: nft.nftAddress,
      });
    }
    setProductData(nfts);
    console.log(nfts);
  };

  useEffect(() => {
    if (data) {
      console.log("data", data)
      fetchData()
    }
  }, [data]);
  return (
    <Layout>
      <Head>
        <title>Explore</title>
        <meta name="description" content="Explore" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        columns={{ base: 1, md: 3, xl: 3 }}
        columnSpacing={"2"}
        mx={"auto"}
        container
      >
        {/* {productData.map((products, index) => (
          <NFTDetails {...products} key={index} />
        ))} */}
         {productData.map((products, index) => (
          <NFT name={""} description={""} image={""} price={""} nftAddress={""} {...products} key={index} />
        ))}
      </Grid>
    </Layout>
  );
}
