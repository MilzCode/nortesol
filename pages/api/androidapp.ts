// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  relation: Array<string>;
  target: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "xyz.appmaker.sgknsn",
      sha256_cert_fingerprints: [
        "9A:A3:06:4E:A7:BF:E7:37:34:82:AE:A7:50:0C:D5:79:F9:E8:86:1D:8B:48:69:AF:FB:4D:03:73:F9:65:A4:56",
      ],
    },
  });
}
