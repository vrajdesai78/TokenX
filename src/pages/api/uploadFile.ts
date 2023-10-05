import { NextApiRequest, NextApiResponse } from "next";
import { SpheronClient, ProtocolEnum } from "@spheron/storage";
import { IncomingForm } from "formidable";
import * as fs from "fs";

export const config = {
    api: {
        bodyParser: false,
    }
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }

    const { image } = files;

    if (!image) {
      return res.status(400).json({ error: "Missing file" });
    }

    const tempPath = "/tmp/TokenX_NFT_Image.png";

    fs.copyFileSync(image[0].filepath, tempPath);

    const client = new SpheronClient({
      token: process.env.SPHERON_TOKEN as string,
    });

    const { protocolLink } = await client.upload(tempPath, {
      protocol: ProtocolEnum.IPFS,
      name: "TokenX_NFT_Image.png",
      onUploadInitiated: (uploadId: string) => {
        console.log(`Upload initiated with ID ${uploadId}`);
      },
    });

    fs.unlinkSync(tempPath);

    res.status(200).json({ protocolLink });
  });
};

export default uploadFile;
