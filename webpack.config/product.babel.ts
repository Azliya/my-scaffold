import webpack, { Configuration } from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import merge from "webpack-merge";
import commConfig from "./common";

export const prdConfig: Configuration = {
  // stats: "verbose",
  mode: "production",
  // optimization: {
  //   minimize: true,
  //   // minimizer: [new TerserPlugin()],
  // },
  // plugins: [
  //   new webpack.EnvironmentPlugin({
  //     NODE_ENV: "production",
  //   }),
  // ],
};

export default merge.smartStrategy({ mode:'replace' })(
  commConfig,
  prdConfig
);
