const { getNamedAccounts, network, ethers, deployments } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe;
      let deployer;
      const sendValue = ethers.utils.parseEther("0.06");

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer);
      });

      it("Allows people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue });
        await fundMe.withdraw();
        const endingBalance = await fundMe.provider.getBalance(fundMe.address);
        assert.equal(endingBalance.toString(), "0");
      });
    });

// const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
// const {
//   developmentChains,
//   networkConfig,
// } = require("../../helper-hardhat-config");
// const { parseEther } = require("ethers/lib/utils");
// const { assert } = require("chai");

// developmentChains.includes(network.name)
//   ? describe.skip
//   : describe("FundMe", async function () {
//       let fundMe;
//       let deployer;
//       const sendValue = parseEther("0.06");
//       beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer;
//         fundMe = await ethers.getContract("FundMe", deployer);
//       });
//       describe("fUND AND WITHDRAW", async function () {
//         it("Funds and Withdraw on testNet", async function () {
//           fund = await fundMe.fund({ value: sendValue });
//           withdraw = await fundMe.withdraw();
//           fundMeBalance = await fundMe.provider.getBalance(fundMe.address);
//           await fundMeBalance.wait(1);
//           assert.equal(fundMeBalance.toString(), "0");
//         });
//       });
//     });
