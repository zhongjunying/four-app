import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
		remotePatterns:[
			{
				protocol:'https',
				hostname:'duyi-resource.oss-cn-beijing.aliyuncs.com'
			}
		]
	}
};

export default nextConfig;
