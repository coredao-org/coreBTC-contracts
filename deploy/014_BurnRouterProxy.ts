import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import verify from "../helper-functions"

import * as dotenv from "dotenv";
dotenv.config();

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const burnRouterLogic = await deployments.get("BurnRouterLogic")

    const deployedContract = await deploy("BurnRouterProxy", {
        from: deployer,
        log: true,
        skipIfAlreadyDeployed: true,
        args: [
            burnRouterLogic.address,
            deployer,
            "0x"
        ],
    });

    if (network.name != "hardhat" && process.env.ETHERSCAN_API_KEY && process.env.VERIFY_OPTION == "1") {
        await verify(
            deployedContract.address, 
            [
                burnRouterLogic.address,
                deployer,
                "0x"
            ], 
            "contracts/routers/BurnRouterProxy.sol:BurnRouterProxy"
        )
    }
};

export default func;
func.tags = ["BurnRouterProxy"];
