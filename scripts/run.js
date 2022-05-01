const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  // We pass in "wallet" to the constructor when deploying
  const domainContract = await domainContractFactory.deploy("wallet");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // We are passing in a second variable - value. This is the money amount!
  let txn = await domainContract.register("silicon", {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();

  const address = await domainContract.getAddress("silicon");
  console.log("Owner of domain silicon:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();