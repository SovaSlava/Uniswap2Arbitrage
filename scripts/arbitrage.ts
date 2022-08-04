import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers  } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
import { Swapper, MockToken} from  "../typechain-types";
function tokens(val:string) {
    return BigNumber.from(val).mul(BigNumber.from("10").pow(18)).toString();
}


async function main() {
   
    let swapper:Swapper;
    let impersonatedSigner:SignerWithAddress;
    let impersonatedSigner2:SignerWithAddress;
    let DAI:MockToken,USDT:MockToken,WETH:MockToken, V2Router:string;
  
        const Swapper = await ethers.getContractFactory("Swapper");
         const MockToken = await ethers.getContractFactory("mockToken");
        DAI = MockToken.attach("0x6B175474E89094C44Da98b954EedeAC495271d0F") as MockToken;
        USDT = MockToken.attach("0xdAC17F958D2ee523a2206206994597C13D831ec7") as MockToken;
        WETH =  MockToken.attach("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2") as MockToken;
        V2Router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
        swapper = await Swapper.deploy();
         impersonatedSigner = await ethers.getImpersonatedSigner("0x8EB8a3b98659Cce290402893d0123abb75E3ab28");
         impersonatedSigner2 = await ethers.getImpersonatedSigner("0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE");
         
 
  
      await WETH.connect(impersonatedSigner).approve(swapper.address,tokens("100") );
      await WETH.connect(impersonatedSigner2).approve(swapper.address,tokens("1000") );
         
      await swapper.connect(impersonatedSigner2).simpleSwap(
         WETH.address,
         DAI.address,
         tokens("1000"),
         tokens("1"),
         impersonatedSigner2.address
      );
      console.log("weth balance before - " + Number(await WETH.balanceOf(impersonatedSigner.address)) / 1e18)
  
        await swapper.connect(impersonatedSigner).swap(
        USDT.address,
        DAI.address,
        tokens("10"),
        tokens("8"),
        impersonatedSigner.address);
        
        console.log("weth balance after -  " + Number(await WETH.balanceOf(impersonatedSigner.address)) / 1e18)
}
main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
     
    
     



