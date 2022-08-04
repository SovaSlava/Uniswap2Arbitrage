// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IUniswapV2Router {
    function swapExactTokensForTokens (
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
     ) external  returns (uint[]  memory amounts);
}

contract Swapper {
    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    function simpleSwap(
        address _tokenA,
        address _tokenB,
        uint _amountIn,
        uint _amountOutMin,
        address to
     ) external {
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenA).approve(UNISWAP_V2_ROUTER, _amountIn);
        address[] memory path;
        path = new address[](2);
        path[0] = _tokenA;
        path[1] = _tokenB;
        IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            to,
            block.timestamp
        );
}

    function swap(
        address _tokenA,
        address _tokenB,
        uint _amountIn,
        uint _amountOutMin,
        address to
    ) external {
        uint balanceWETHBefore = IERC20(WETH).balanceOf(msg.sender);
        IERC20(WETH).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(WETH).approve(UNISWAP_V2_ROUTER, _amountIn);
        
        address[] memory path;
        path = new address[](4);
        path[0] = WETH;
        path[1] = _tokenA;
        path[2] = _tokenB;
        path[3] = WETH;
        IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            to,
            block.timestamp
        );

        uint balanceWETHAfter = IERC20(WETH).balanceOf(msg.sender);
        require(balanceWETHAfter > balanceWETHBefore, "arbitrage failed");
    }
}