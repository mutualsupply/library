// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {CaseStudy} from "../src/CaseStudy.sol";

contract CaseStudyTest is Test {
    CaseStudy public caseStudy;

    function setUp() public {
        caseStudy = new CaseStudy();
        caseStudy.setNumber(0);
    }

    function test_Increment() public {
        caseStudy.increment();
        assertEq(caseStudy.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        caseStudy.setNumber(x);
        assertEq(caseStudy.number(), x);
    }
}
