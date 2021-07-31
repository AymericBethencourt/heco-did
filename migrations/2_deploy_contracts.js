const HecoDidRegistry = artifacts.require("HecoDidRegistry");

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(HecoDidRegistry);
  const bscDidRegistry = await HecoDidRegistry.deployed();
};
