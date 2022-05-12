const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("wallet");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
    const newDomain = "asd123"

    let txn = await domainContract.register(newDomain,  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log(`Minted domain ${newDomain}.wallet`);
  
    txn = await domainContract.setRecord(newDomain, "Am I a silicon or a wallet??");
    await txn.wait();
    console.log(`Set record for ${newDomain}.wallet`);
  
    const address = await domainContract.getAddress(newDomain);
    console.log(`Owner of domain ${newDomain}: ${address}`);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
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