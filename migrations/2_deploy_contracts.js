const AccessControl = artifacts.require("AccessControl");
const TimeContext = artifacts.require("TimeContext");

module.exports = async function (deployer) {
  try {
    // Set a high gas limit for deployment
    await deployer.deploy(AccessControl, { gas: 6721975 });
    await deployer.deploy(TimeContext, { gas: 6721975 });
    
    console.log("Contracts deployed successfully.");
  } catch (error) {
    console.error("Deployment failed:", error);
  }
};
