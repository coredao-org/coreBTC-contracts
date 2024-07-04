import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import config from 'config'
import {isEnableMultipleCollaterals, verify} from "../helper-functions"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const acceptableDelay = config.get("oracle.acceptable_delay");

    let args = [
        acceptableDelay
    ];

    if (isEnableMultipleCollaterals()) {
        const earnWrappedToken = config.get("oracle.lst.stcore");
        const earnStrategy = config.get("oracle.lst.earn");
        args.push(earnWrappedToken);
        args.push(earnStrategy);
    }

    const deployedContract = await deploy("PriceOracle", {
        from: deployer,
        log: true,
        skipIfAlreadyDeployed: true,
        args: args,
    });

    if (network.name != "hardhat" && process.env.ETHERSCAN_API_KEY && process.env.VERIFY_OPTION == "1") {
        await verify(
            deployedContract.address,
            args,
            "contracts/oracle/PriceOracle.sol:PriceOracle")
    }
};

export default func;
func.tags = ["PriceOracle"];
