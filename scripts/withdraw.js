const { ethers, getNamedAccounts } = require("hardhat");
async function main() {
  const { deployer } = getNamedAccounts;
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("Withdrawing...");
  const transactionResponse = await fundMe.withdraw();
  await transactionResponse.wait(1);
  console.log("Got it back");
}
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
