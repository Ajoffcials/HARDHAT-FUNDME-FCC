// const { network } = require("hardhat");
// const DECIMALS = "4";
// const INITIAL_PRICE = "200000000"; // 2000

// module.exports = async ({ getNamedAccounts, deployments }) => {
//   const { deploy, log } = deployments;
//   const { deployer } = await getNamedAccounts();
//   const chainId = network.config.chainId;
//   // If we are on a local development network, we need to deploy mocks!
//   if (chainId == 31337) {
//     log("Local network detected! Deploying mocks...");
//     await deploy("MockV3Aggregator", {
//       contract: "MockV3Aggregator",
//       from: deployer,
//       log: true,
//       args: [DECIMALS, INITIAL_PRICE],
//     });
//     log("Mocks Deployed!");
//     log("------------------------------------------------");
//     log(
//       "You are deploying to a local network, you'll need a local network running to interact"
//     );
//     log(
//       "Please run `npx hardhat console` to interact with the deployed smart contracts!"
//     );
//     log("------------------------------------------------");
//   }
// };
// module.exports.tags = ["all", "mocks"];
const decimals = "4";
const intial = "200000000";
const { network } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
const chainId = network.config.chainId;
 
  if (chainId == 31337) {
     log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [decimals, intial],
    });
    log("deploying MockV3Aggregator");
  }
};
module.exports.tags = ["all", "mocks"];
