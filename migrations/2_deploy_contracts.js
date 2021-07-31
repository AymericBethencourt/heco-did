const HecoDidRegistry = artifacts.require("HecoDidRegistry");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(HecoDidRegistry);
  const hecoDidRegistry = await HecoDidRegistry.deployed();
};
