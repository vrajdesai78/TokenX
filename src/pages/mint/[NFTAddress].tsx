import Layout from "@/components/layout";
import Image from "next/image";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import NFTContract from "@/utils/ABI/NFTContract.json";
import toast from "react-hot-toast";
import { Button as Btn } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";

const MintNFT = () => {
  const { theme } = useTheme();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(BigInt(0));
  const [isLoading, setIsLoading] = useState(false);

  const { query } = useRouter();

  const { data: uriData } = useContractRead({
    address: query.NFTAddress as `0x${string}`,
    abi: NFTContract,
    functionName: "uri",
    args: [0],
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const { data: nftPrice } = useContractRead({
    address: query.NFTAddress as `0x${string}`,
    abi: NFTContract,
    functionName: "nftPrice",
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const { config } = usePrepareContractWrite({
    address: query.NFTAddress as `0x${string}`,
    abi: NFTContract,
    functionName: "nftMint",
    value: nftPrice ? BigInt(nftPrice as any) : BigInt(0),
  });

  const { writeAsync, error, isSuccess } = useContractWrite(config);

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
      toast.success("NFT Minted Successfully");
    }
  }, [isSuccess]);

  const getNftdata = async () => {
    fetch(uriData as string)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImage(data.image);
        setName(data.name);
        setDescription(data.description);
        setPrice(data);
      });
  };

  useEffect(() => {
    if (uriData) {
      getNftdata();
    }
  }, [query, uriData]);

  return (
    <Layout>
      <div className="flex mx-auto mt-14 ml-10 justify-center items-center z-0">
        <Box
          sx={{
            role: "group",
            p: 4,
            maxWidth: "400px",
            width: "100%",
            bgcolor: theme === "light" ? "white" : "#110a24",
            boxShadow: 2,
            borderRadius: "xl",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            borderRadius={"lg"}
            mt={-12}
            position={"relative"}
            height={"300px"}
            overflow="hidden"
          >
            <Image
              className="rounded-lg"
              layout="fill"
              objectFit="cover"
              loader={() => image}
              src={image}
              alt="#"
            />
            <Box
              height="100%"
              width="100%"
              position="absolute"
              top={0}
              left={0}
              className="backdrop-blur-lg"
              zIndex={-1}
            />
          </Box>
          <Stack pt={2} alignItems={"center"}>
            <Typography
              className="text-xl"
              fontWeight={700}
              textTransform={"uppercase"}
            >
              {name}
            </Typography>
            <Typography className="text-lg">{description}</Typography>
            <Stack direction={"row"} alignItems={"center"}>
              <Btn
                className="px-5 py-2 bg-[#c3a6ff90] hover:bg-[#b691ff90] mt-3 text-gray-700 rounded-3xl drop-shadow-md dark:bg-[#d1baff] dark:hover:bg-[#cab0ff]"
                onClick={async () => {
                  setIsLoading(true);
                  try { await writeAsync?.();} catch (error) {
                    setIsLoading(false);
                    toast.error("Error while minting NFT");
                  }
                }}
                startIcon={isLoading ? <CircularProgress size='sm' /> : null}
              >
                Mint
              </Btn>
            </Stack>
          </Stack>
        </Box>
      </div>
    </Layout>
  );
};

export default MintNFT;
