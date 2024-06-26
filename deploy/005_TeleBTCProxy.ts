import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import verify from "../helper-functions"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const teleBTCLogic = await deployments.get("TeleBTCLogic")

    let theArgs = [
        teleBTCLogic.address,
        deployer,
        "0x"
    ]

    const deployedContract = await deploy("TeleBTCProxy", {
        from: deployer,
        log: true,
        skipIfAlreadyDeployed: true,
        args: theArgs,
    });

    if (network.name != "hardhat" && process.env.ETHERSCAN_API_KEY && process.env.VERIFY_OPTION == "1") {
        await verify(
            deployedContract.address, 
            theArgs, 
            "contracts/erc20/TeleBTCProxy.sol:TeleBTCProxy"
        )
    }
};

export default func;
func.tags = ["TeleBTCProxy"];
