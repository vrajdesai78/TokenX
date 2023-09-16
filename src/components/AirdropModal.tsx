import React, { useState } from "react";
import { Box, Button, Typography, Modal, Link } from "@mui/material";
import Upload from "./form-elements/upload";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useNetwork } from "wagmi";
import { LuExternalLink } from "react-icons/lu";
import toast from "react-hot-toast";

type AirdropModalProps = {
  open: boolean;
  onClose: () => void;
  nftAddress: string;
};

const AirdropModal = ({ open, onClose, nftAddress }: AirdropModalProps) => {
  const { theme } = useTheme();
  const { push } = useRouter();
  const { chain } = useNetwork();
  const [airdropAddresses, setAirdropAddresses] = useState<string[]>([]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme === "light" ? "background.paper" : "#110a24",
          border: theme === "light" ? "2px solid #000" : "2px solid #69579e",
          borderRadius: "15px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="flex flex-row justify-between items-center">
          <Typography id="modal-modal-title" variant="h5" component="h2">
            AIRDROP 🚀
          </Typography>
          <LuExternalLink
            size={20}
            className="hover:text-[#a13bf7] cursor-pointer"
            onClick={() => {
              push(`/mint/${nftAddress}`);
            }}
          />
        </div>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className="text-gray-600 dark:text-gray-200"
        >
          Please upload the recipient list in this{" "}
          <Link
            underline="none"
            href=""
            className="text-[#a13bf7] dark:text-[#f8c851]"
          >
            format
          </Link>
        </Typography>
        <div className="flex flex-row space-x-3 items-center justify-center mt-2 mx-auto">
          <Upload
            id="image"
            name="image"
            type="file"
            accept="application/JSON"
            onChange={async (e: any) => {
              const file = e.target.files[0];
              console.log(file);
              const contents = await file.text();
              const json = JSON.parse(contents);
              console.log(json.address);
              setAirdropAddresses(json.address);
            }}
          />
          <Button
            className="text-white rounded-lg bg-gradient-to-r from-[#f9b92a] to-[#dc9519]"
            onClick={async () => {
              const response = await fetch("/api/airdrop", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  contractAddress: nftAddress,
                  address: airdropAddresses,
                  chain: chain?.name,
                }),
              });
              const data = await response.json();
              console.log(data);
              if (data) {
                toast.success("Airdrop successful");
              }
            }}
          >
            Send
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AirdropModal;
