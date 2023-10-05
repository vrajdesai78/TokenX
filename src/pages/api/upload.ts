import { NextApiRequest, NextApiResponse } from "next";
import { SpheronClient, ProtocolEnum } from "@spheron/storage";
import * as fs from "fs";

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Missing content" });
  }

  const tempPath = "/tmp/metadata.json";
  if (content) {
    fs.writeFileSync(tempPath, JSON.stringify(content));
  }

  const client = new SpheronClient({
    token: process.env.SPHERON_TOKEN as string,
  });

  const { protocolLink } = await client.upload(tempPath, {
    protocol: ProtocolEnum.IPFS,
    name: "metadata.json",
    onUploadInitiated: (uploadId: string) => {
      console.log(`Upload initiated with ID ${uploadId}`);
    },
  });

  fs.unlinkSync(tempPath);

  res.send({ protocolLink });
};

export default upload;
