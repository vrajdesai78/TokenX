import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import Input from "@/components/form-elements/input";
import Upload from "@/components/form-elements/upload";
import MCheckbox from "@/components/form-elements/checkbox";
import Button from "@/components/form-elements/button";
import { optimismContractAddress, zoraContractAddress, baseContractAddress, modeContractAddress } from "@/utils/constants";
import NFTContractFactory from "@/utils/ABI/NFTContractFactory.json";
import Image from "next/image";
import { useAccount, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { useSnackbarState } from "@/context/snackbar";
import { SpheronClient, ProtocolEnum } from "@spheron/storage";

const NFTMembership = () => {
  const { setOpen, setMessage } = useSnackbarState();
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSupply, setIsSupply] = useState(false);
  const [supply, setSupply] = useState("0");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const callContract = async (metaDataUrl: string) => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress as `0x${string}`,
      NFTContractFactory,
      signer
    );
    contract
      .createNFT(metaDataUrl, supply, isSupply, price, address)
      .then(async (tx: string) => {
        {
          if (tx) {
            setIsLoading(false);
            setMessage("NFT created successfully");
            setOpen(true);
          }
        }
      });
  };

  const uploadMetadata = async () => {
    setIsLoading(true);
    var metadata = {
      name: name,
      description: description,
      image: imageUrl,
    };
    const client = new SpheronClient({ token: process.env.NEXT_PUBLIC_SPHERON_TOKEN as string});
    const { uploadId, bucketId, protocolLink, dynamicLinks, cid } = await client.upload(
      JSON.stringify(metadata),
      {
        protocol: ProtocolEnum.IPFS,
        name: "metadata.json",
        onUploadInitiated: (uploadId: string) => {
          console.log(`Upload initiated with ID ${uploadId}`);
        }
      }
    )
    console.log(`Upload ID: ${uploadId}`);
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
        <div className="flex items-center w-[90%] md:w-full bg-gradient-to-r from-[#c45cfc] to-[#7b4fc9] rounded-[30px] overflow-hidden shadow-lg">
          <div className="hidden md:flex mx-auto justify-center ml-5">
            <Image src="/nft.png" width="150" height="150" alt="Icon" />
          </div>
          <div className="px-10 py-8 text-white text-right">
            <div className="font-bold text-xl mb-2">NFT Memberships</div>
            <div className="font-bold text-md mb-2">
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
                const files = e.target.files;
                const client = new Web3Storage({
                  token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxZTRjOEMwNTJiMzkzNEQ3Nzc5NWM3QWQ3MkQ0MTFhMGQyMWUxODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE2ODYwNTU1NjIsIm5hbWUiOiJNYXRpYy1Qcm9maWxlIn0.zDWjIoqZUCnPXtvWXjm_ZbvPN2ZZHTfcK7JHdM2S7hk",
                });
                client.put(files).then((cid: any) => {
                  console.log(cid);
                  setImageUrl(`https://${cid}.ipfs.w3s.link/${files[0].name}`);
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
          <Button
            label="Create"
            onClick={async (e: any) => {
              e.preventDefault();
              await uploadMetadata();
            }}
            disabled={isLoading}
          />
        </form>
      </div>
    </Layout>
  );
};

export default NFTMembership;
