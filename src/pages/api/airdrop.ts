import { ethers } from "ethers";
import NFTContract from "@/utils/ABI/NFTContract.json";

import { NextApiRequest, NextApiResponse } from "next";

const airdrop = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, chain, contractAddress } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Missing address or amount" });
  }

  const provider = new ethers.providers.JsonRpcProvider(
    chain === "Optimism Goerli"
      ? "https://goerli.optimism.io"
      : chain === "Base Goerli"
      ? "https://goerli.base.org"
      : chain === "Zora Goerli Testnet" ? "https://testnet.rpc.zora.energy" : "https://sepolia.mode.network/"
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  console.log(address, chain, contractAddress, process.env.PRIVATE_KEY);

  try {
    const contract = new ethers.Contract(contractAddress, NFTContract, wallet);

    let baseNonce = provider.getTransactionCount(wallet.getAddress());
    let nonceOffset = 0;
    const getNonce = () => {
      return baseNonce.then((nonce) => nonce + nonceOffset++);
    };
    const airdropPromises = address.map(async (addr: string) => {
      const nonce = getNonce();
      const tx = await contract.airdropNft(addr, { nonce }); // Await the airdropNft transaction
      await tx.wait();
      console.log("tx hash:", tx.hash);
    });

    await Promise.all(airdropPromises);

    return res.status(200).json({ message: "Airdrop successful" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: "Airdrop failed" });
  }
};

export default airdrop;
