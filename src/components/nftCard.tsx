import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import AirdropModal from "./AirdropModal";
import { LuExternalLink } from "react-icons/lu";

type nftDataProps = {
  name: string;
  description: string;
  image: string;
  price: string;
  nftAddress: string;
};

export default function NFTDetails(nftData: nftDataProps) {
  const { name, description, image, price, nftAddress } = nftData;
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { push } = useRouter();

  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          my: 3,
          mx: [0, 2],
          overflow: "hidden",
          bgcolor: theme === "light" ? "white" : "#110a24",
          borderRadius: "10px",
          border: "1px solid black",
          boxShadow:
            theme === "light" ? "6px 6px 0 black" : "6px 6px 0 #9FF3FF",
          width: "350px",
          maxWidth: { sm: "300px", md: "300px", lg: "350px", xl: "400px" },
        }}
      >
        <CardMedia
          component="img"
          alt="NFT"
          height="200"
          image={image}
          title={name}
          sx={{
            borderBottom:
              theme === "light" ? "1px solid black" : "1px solid #9FF3FF",
            height: "250px",
            objectFit: "fill",
          }}
        />
        <CardContent>
          <div className="flex flex-row justify-between items-center">
            <Box
              component="div"
              bgcolor={theme === "light" ? "#232324" : "#9FF3FF"}
              display="inline-block"
              px={1.5}
              py={1}
              color="white"
              borderRadius={1}
              mb={2}
            >
              <Typography variant="caption" fontWeight="medium" className="dark:text-black text-white">
                {price} ETH
              </Typography>
            </Box>
            <LuExternalLink
              size={20}
              className={`${
                theme === "dark" ? "text-white" : "text-white"
              } hover:text-[#9FF3FF] cursor-pointer`}
              onClick={() => {
                push(`/mint/${nftAddress}`);
              }}
            />
          </div>
          <Typography
            variant="h5"
            component="h2"
            className="text-gray-800 dark:text-gray-100"
            noWrap
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className="text-gray-600 dark:text-[#9FF3FF]"
            noWrap
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions className="border-t dark:border-[#9FF3FF]">
          <Button
            size="medium"
            color="primary"
            endIcon={<IoMdSend />}
            className="w-full text-gray-700 dark:text-[#9FF3FF]"
            onClick={handleOpen}
          >
            Airdrop
          </Button>
          <AirdropModal
            open={open}
            onClose={handleClose}
            nftAddress={nftAddress}
          />
        </CardActions>
      </Card>
    </Box>
  );
}
