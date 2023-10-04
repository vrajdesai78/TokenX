import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import Input from "@/components/form-elements/input";
import Upload from "@/components/form-elements/upload";
import MCheckbox from "@/components/form-elements/checkbox";
import Button from "@/components/form-elements/button";
import CircularProgress from '@mui/joy/CircularProgress';
import { Button as Btn } from "@mui/material";
import {
 xdcMainnetContractAddress
} from "@/utils/constants";
import NFTContractFactory from "@/utils/ABI/NFTContractFactory.json";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const NFTMembership = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSupply, setIsSupply] = useState(false);
  const [supply, setSupply] = useState("0");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();

  const callContract = async (metaDataUrl: string) => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      xdcMainnetContractAddress as `0x${string}`,
      NFTContractFactory,
      signer
    );
    contract
      .createNFT(metaDataUrl, supply, isSupply, ethers.utils.parseEther(price), address)
      .then(async (tx: string) => {
        {
          if (tx) {
            setIsLoading(false);
            toast.success("NFT Created Successfully");
          }
        }
      });
  };

  const uploadMetadata = async () => {
    setIsLoading(true);
    const metadata = {
      name: name,
      description: description,
      image: imageUrl,
    };
    fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        "content": metadata,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        callContract(`${data.protocolLink}/metadata.json`);
      });
  };

  return (
    <Layout>
      <Head>
        <title>Create NFT</title>
        <meta name="description" content="tokenup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col space-y-8 justify-center items-center max-w-[800px] mx-auto pb-32 pl-[60px] lg:pl-0">
        <div className="flex items-center w-[90%] md:w-full bg-gradient-to-r from-[#FFDC9A] to-[#FFBFAB] rounded-[30px] overflow-hidden shadow-lg">
          <div className="hidden md:flex mx-auto justify-center ml-5">
            <Image src="/NFT.png" width="150" height="150" alt="Icon" />
          </div>
          <div className="px-10 py-8 text-[#131619] text-right">
            <div className="font-bold text-xl mb-2">NFT Memberships</div>
            <div className="font-bold text-md mb-2 text-gray-800">
              Monetize your community memberships to grant access and benefits.
              Specially designed for DAOs and guilds.
            </div>
          </div>
        </div>
        <form className="flex flex-col space-y-3 w-[90%] md:max-w-[600px] mx-auto">
          <Image
            className="mx-auto rounded-xl"
            src={image !== "" ? image : "/preview.png"}
            alt="preview"
            width={200}
            height={200}
          />
          <div className="mx-auto w-[40%]">
            <Upload
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e: any) => {
                const image = URL.createObjectURL(e.target.files[0]);
                setImage(image);
                const formData = new FormData();
                formData.append("image", e.target.files[0]);
                fetch("/api/uploadFile", {
                  method: "POST",
                  body: formData,
                }).then(async (res: any) => {
                  const { protocolLink } = await res.json();
                  console.log(protocolLink);
                  setImageUrl(`${protocolLink}/TokenX_NFT_Image.png`);
                });
              }}
            />
          </div>
          <Input
            id="name"
            name="name"
            label="Name"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            helper="This Can Be Your DAO Name or Special Access Collection"
          />
          <Input
            id="description"
            name="description"
            label="Description"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            value={description}
            helper="Write Something About This NFT or Features"
          />
          <MCheckbox
            name="supply"
            label="Set Max Supply"
            checked={isSupply}
            onChange={() => {
              setIsSupply(!isSupply);
            }}
          />
          {isSupply && (
            <Input
              id="supply"
              name="supply"
              label="Max Supply"
              type="number"
              value={supply}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSupply(e.target.value)
              }
              helper="Recommended Max Supply - 100 Tokens."
            />
          )}
          <Input
            id="price"
            name="price"
            label="Price"
            type="number"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
            helper="Recommend initial NFT Price - 0.01 ETH, No 'ETH' Symbol Required."
          />
          <Btn
            onClick={async (e: any) => {
              e.preventDefault();
              if (name === "" || description === "" || imageUrl === "" || price === "") {
                toast.error("Please fill all required fields");
                return;
              }
              await uploadMetadata();
            }}
            className={`mx-auto text-[#9FF3FF] dark:text-[#131619] hover:bg-black items-center justify-center ${isLoading ? "dark:bg-[#abf3fe]" : "dark:bg-[#9FF3FF]"} ${isLoading ? "bg-[#333334]" : "bg-[#131619]"} dark:hover:bg-[#95e5f2] focus:ring-1 focus:outline-none focus:ring-[#cfcfcf] font-medium rounded-xl text-sm px-5 py-2.5 text-center shadow-none drop-shadow-xl"}`}
            startIcon={isLoading ? <CircularProgress size="sm"/> : null}
            disabled={isLoading}
          >
            Create NFT
          </Btn>
        </form>
      </div>
    </Layout>
  );
};

export default NFTMembership;
