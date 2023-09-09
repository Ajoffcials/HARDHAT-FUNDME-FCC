// const { ethers, run, network } = require("hardhat");
// async function verify(contratAddress, args) {
//     console.log("verfying contract address...");
//     try {
//       //run to run task
//       await run("verify:verify", {
//         address: contratAddress,
//         constructorArguments: args,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   module.exports ={
//     verify
//   }

const { run } = require("hardhat");

async function verify(address, args) {
  try {
    await run("verify:verify", {
      address: address,
      constructorArguments: args,
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { verify };

// const etherScanVerification = await verify(contractAddress, args);
