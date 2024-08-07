// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./interfaces/ILockersStorage.sol";

contract LockersStorageStructure is ILockersStorage {

    // Constants
    uint public constant ONE_HUNDRED_PERCENT = 10000;
    uint public constant HEALTH_FACTOR = 10000;
    uint public constant UPPER_HEALTH_FACTOR = 12500;
    uint public constant MAX_LOCKER_FEE = 10000;
    uint public constant INACTIVATION_DELAY = 345600; // 4 days (it should be greater than MAX_FINALIZATION_PARAMETER)
    uint public constant NATIVE_TOKEN_DECIMAL = 18;
    address public constant NATIVE_TOKEN = address(1);

    // Public variables
    address public override coreBTC;
    address public override ccBurnRouter;
    address public override priceOracle;
    address public override collaterals;

    uint public override lockerPercentageFee;
    uint public override collateralRatio;
    uint public override liquidationRatio;
    uint public override priceWithDiscountRatio;
    uint public override slashCompensationRatio;
    uint public override totalNumberOfCandidates;
    uint public override totalNumberOfLockers;

    address[] public override approvedLockers;                  // storage target address
    mapping(address => DataTypes.locker) public lockersMapping; // locker's target address -> locker structure
    mapping(address => uint) public lockerInactivationTimestamp;
    mapping(address => bool) public lockerLeavingAcceptance;
    mapping(bytes => address) public lockerTargetAddress; // locker's locking script -> locker's target address
    mapping(address => bool) minters;
    mapping(address => bool) burners;

    DataTypes.lockersLibConstants public libConstants;
    DataTypes.lockersLibParam public libParams;
}
