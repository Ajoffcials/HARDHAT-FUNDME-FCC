// const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
// const { assert, expect } = require("chai");
// const { parseEther } = require("ethers/lib/utils");
// const { developmentChains } = require("../../helper-hardhat-config");

// const sendValue = parseEther("0.7");

// !developmentChains.includes(network.name)
//   ? describe.skip
//   : describe("FundMe", async function () {
//       let fundMe;
//       let deployer;
//       let MockV3Aggregator;

//       beforeEach(async function () {
//         deployer = (await getNamedAccounts()).deployer;
//         await deployments.fixture(["all"]);
//         fundMe = await ethers.getContract("FundMe", deployer);
//         MockV3Aggregator = await ethers.getContract(
//           "MockV3Aggregator",
//           deployer
//         );
//       });

//       describe("constructor", async function () {
//         it("set the aggregator address correctly", async () => {
//           const response = await fundMe.priceFeed();
//           assert.equal(response, MockV3Aggregator.address);
//         });

//         describe("fund", async function () {
//           it("fails if you don't send enough eth", async function () {
//             await expect(fundMe.fund()).to.be.reverted;
//           });
//         });

//         it("updates amount funded data structure", async function () {
//           await fundMe.fund({ value: sendValue });
//           const response = await fundMe.addressToAmount(deployer);
//           assert.equal(response.toString(), sendValue.toString()); // Moved assert here
//         });
//       });
//       it("Adds Funders To Array Of Funders", async () => {
//         await fundMe.fund({ value: sendValue });
//         const funder = await fundMe.funders(0);
//         assert.equal(funder, deployer);
//       });
//       describe("Withdraw", async () => {
//         beforeEach(async () => {
//           await fundMe.fund({ value: sendValue });
//         });
//         it("withdraw Eth from a singer Funder", async () => {
//           //Arraged
//           const startingFundMeBalance = await fundMe.provider.getBalance(
//             fundMe.address
//           );
//           const startingDeployerBalance = await fundMe.provider.getBalance(
//             deployer
//           );

//           //act
//           const transactionResponse = await fundMe.withdraw();
//           const transactionReciept = await transactionResponse.wait(1);
//           const { gasUsed, effectiveGasPrice } = transactionReciept;
//           const gasCost = gasUsed.mul(effectiveGasPrice);

//           const endingFundMeBalance = await fundMe.provider.getBalance(
//             fundMe.address
//           );
//           const endingDeployerBalance = await fundMe.provider.getBalance(
//             deployer
//           );
//           //gascost

//           //assert
//           assert.equal(endingFundMeBalance, 0);
//           assert.equal(
//             startingFundMeBalance.add(startingDeployerBalance).toString(),
//             endingDeployerBalance.add(gasCost).toString()
//           );
//         });
//       });
//       it("allows us to withdraw with mutiple funders", async function () {
//         const accounts = await ethers.getSigners();
//         for (let i = 1; i < 6; i++) {
//           const fundMeConnectedContract = await fundMe.connect(accounts[i]);
//           await fundMeConnectedContract.fund({ value: sendValue });
//         }
//         const startingFundMeBalance = await fundMe.provider.getBalance(
//           fundMe.address
//         );
//         const startingDeployerBalance = await fundMe.provider.getBalance(
//           deployer
//         );

//         //act
//         const transactionResponse = await fundMe.withdraw();
//         const transactionReciept = await transactionResponse.wait(1);
//         //gas
//         const { gasUsed, effectiveGasPrice } = transactionReciept;
//         const gasCost = gasUsed.mul(effectiveGasPrice);

//         const endingFundMeBalance = await fundMe.provider.getBalance(
//           fundMe.address
//         );
//         const endingDeployerBalance = await fundMe.provider.getBalance(
//           deployer
//         );
//         assert.equal(endingFundMeBalance, 0);
//         assert.equal(
//           startingFundMeBalance.add(startingDeployerBalance).toString(),
//           endingDeployerBalance.add(gasCost).toString()
//         );
//         //make sure funders is reset properly
//         await expect(fundMe.funders(0)).to.be.reverted;
//         for (i = 0; i > 6; i++) {
//           assert.equal(await fundMe.addressToAmount(accounts[i]).address, 0);
//         }
//       });
//       it("only allows owners to withdraw", async function () {
//         const account = await ethers.getSigners();
//         const attacker = account[1];
//         const attackerConnectedAccounts = await fundMe.connect(attacker);
//         await expect(depl.withdraw()).to.be.reverted;
//       });
//     });
const { deployments, network } = require("hardhat");
const { assert, expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("fundMe", async function () {
      let deployer;
      let fundMe;
      let MockV3Aggregator;
      let sendAmount = parseEther("1");
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        fundMe = await ethers.getContract("FundMe", deployer);
        MockV3Aggregator = await ethers.getContract(
          "MockV3Aggregator",
          deployer
        );
      });
      describe("Costructor", async function () {
        it("confirm if mockAggregator is priceFeed", async function () {
          transactionResponse = await fundMe.priceFeed();
          assert.equal(MockV3Aggregator.address, transactionResponse);
        });
      });
      describe("fund", async function () {
        it("if you fail to send enough eth", async function () {
          fund = fundMe.fund({ value: 0 });
          await expect(fund).to.be.reverted;
        });
      });
      describe("Amount send confirmations", async function () {
        it("Confirm amount", async function () {
          fund = await fundMe.fund({ value: sendAmount });
          TransactionResponse = await fundMe.addressToAmount(deployer);
          assert.equal(TransactionResponse.toString(), sendAmount.toString());
        });
        describe("funders Array Confirmation", async function () {
          it("Confirm Funders Array", async function () {
            fund = await fundMe.fund({ value: sendAmount });
            fundersAddress = await fundMe.funders(0);
            assert.equal(fundersAddress, deployer);
          });
        });
        describe("Withdraw", async function () {
          beforeEach(async function () {
            await fundMe.fund({ value: sendAmount });
          });
          it("Withdraw of the whole Balance", async function () {
            // starting Balance
            const fundMeStartingBalance = await fundMe.provider.getBalance(
              fundMe.address
            );
            const deployerStartingBalance = await fundMe.provider.getBalance(
              deployer
            );
            //Withdraw
            const withdraw = await fundMe.withdraw();
            const transactionReciept = await withdraw.wait(1);
            //Ending Balance
            const fundMeEndingbalance = await fundMe.provider.getBalance(
              fundMe.address
            );
            const deployerEndingBalance = await fundMe.provider.getBalance(
              deployer
            );
            // Gas cost
            const { gasUsed, effectiveGasPrice } = transactionReciept;
            const gasCost = gasUsed.mul(effectiveGasPrice);
            assert.equal(fundMeEndingbalance, "0");
            assert.equal(
              fundMeStartingBalance.add(deployerStartingBalance).toString(),
              deployerEndingBalance.add(gasCost).toString()
            );
          });
          it("Allows Us to withdraw with diffirent Signers", async function () {
            const accounts = await ethers.getSigners();
            for (i = 0; i < accounts.length; i++) {
              const accountFactory = await fundMe.connect(accounts[i]);
              fundAccountFactory = await accountFactory.fund({
                value: sendAmount,
              });
            }
            //balance
            const fundMeStartingBalance = await fundMe.provider.getBalance(
              fundMe.address
            );
            const deployerStartingBalance = await fundMe.provider.getBalance(
              deployer
            );
            //Withdraw
            const withdraw = await fundMe.withdraw();
            const transactionReciept = await withdraw.wait(1);
            //Ending Balance
            const fundMeEndingbalance = await fundMe.provider.getBalance(
              fundMe.address
            );
            const deployerEndingBalance = await fundMe.provider.getBalance(
              deployer
            );
            // Gas cost
            const { gasUsed, effectiveGasPrice } = transactionReciept;
            const gasCost = gasUsed.mul(effectiveGasPrice);
            assert.equal(fundMeEndingbalance, "0");
            assert.equal(
              fundMeStartingBalance.add(deployerStartingBalance).toString(),
              deployerEndingBalance.add(gasCost).toString()
            );
            // confirm reset array

            for (i = 0; i < accounts.length; i++) {
              assert.equal(
                await fundMe.addressToAmount(accounts[i].address),
                "0"
              );
            }
          });
        });
      });
    });
