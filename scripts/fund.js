const { getNamedAccounts, ethers } = require("hardhat");
async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("Funding contract....");
  const trasactionResponse = await fundMe.fund({
    value: ethers.utils.parseEther("1"),
  });
  const transactionReciept = await trasactionResponse.wait(1);
  console.log("funded");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
