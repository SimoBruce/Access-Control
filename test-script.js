const AccessControl = artifacts.require("AccessControl");
const TimeContext = artifacts.require("TimeContext");

module.exports = async function(callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        
        // Deploy contracts
        const accessControl = await AccessControl.deployed();
        const timeContext = await TimeContext.deployed();

        console.log("Contracts deployed successfully.");
        console.log("AccessControl address:", accessControl.address);
        console.log("TimeContext address:", timeContext.address);

        // Assign roles using Ganache GUI addresses
        const adminAddress = '0x02F47320F15Fa45da007A11e70BB7b124Fd27c92'; // Replace with your admin Ethereum address from Ganache GUI
        const userAddress = '0xa515c38389ed7daf23b20dBE1b23054C782AB00e';  // Replace with your user Ethereum address from Ganache GUI

        // Debugging: Ensure the addresses are correct
        console.log("Assigning roles:");
        console.log("Admin Address:", adminAddress);
        console.log("User Address:", userAddress);

        await accessControl.assignRole(adminAddress, 'admin', { from: accounts[0] });
        await accessControl.assignRole(userAddress, 'user', { from: accounts[0] });

        console.log("Roles assigned successfully.");

        // Check access for different users
        const adminRole = await accessControl.getRole(adminAddress);
        const userRole = await accessControl.getRole(userAddress);
        console.log(`Admin Address Role: ${adminRole}`); // Should be 'admin'
        console.log(`User Address Role: ${userRole}`); // Should be 'user'

        // Call the checkAccess function in interact.js to test access
        const checkAccess = require('./interact.js');

        console.log("Checking access for admin address:");
        await checkAccess(adminAddress); // Use the admin Ethereum address

        console.log("Checking access for user address:");
        await checkAccess(userAddress);  // Use the user Ethereum address

        console.log("Test script executed successfully.");
    } catch (error) {
        console.error("An error occurred:", error.message);
        console.error(error.stack);
    }

    callback();
};

