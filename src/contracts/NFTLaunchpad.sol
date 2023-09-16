// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./NFT.sol";

error ONLY_ONWER_CAN_CALL();
error SEND_SUFFICIENT_ETH();

contract LaunchPadNft {

    // LaunchPadNft contract onwer
    address private launchPadNftOwner;

    // number of NFT Created
    uint256 private numOfNftCreated;

    // Cap for Maximum NFT Minted
    uint256 private nftMaxSupply;

    // events
    event CreateNewNft(string uri, uint supply, uint nftPrice, address factoryContractAddress, address indexed nftAddress);
    event WithdrawMoney(address withdrawAddress, uint amount);

    /**
     * @notice struct to store all the data of NFT ( string uri, uint supply, uint nftPrice) and launchPadNftOwner(address launchPadNftOwner) contract
     */
    struct NftStruct {
        string uri;
        uint supply;
        uint nftPrice;
        address launchPadNftAddress;
        address creator;
        address nftAddress;
    }

    /**
     * @notice searching the struct data of NFT and LaunchPadNft using owner address
     */
    mapping(address => NftStruct[]) public allNftData;

    // creator address to check the addresses of nft created
    // creator => NFT addresses
    mapping(address => address[]) public nftAddresses;

    // modifier to allow onwer to call the function
    modifier onlyOwner() {
        if(msg.sender != launchPadNftOwner){
            revert ONLY_ONWER_CAN_CALL();
        }
        _;
    }

    /**
     * @dev constructor to get the owner address of this contract factory
     */
    constructor(address _launchPadNftOwner) {
        launchPadNftOwner = _launchPadNftOwner;
    }

    /**
     * @dev : function to create new course and course address on searchBy Address
     * @param _uri : NFT URI
     * @param _maxSupply : Total supply of NFTs
     * @param _nftPrice : Price of the NFT
     * @param _creatorAddress : Address of the Creator
     */
    function createNFT(string memory _uri, uint256 _maxSupply , bool _wantMaxSupply, uint _nftPrice, address _creatorAddress) public {
        nftMaxSupply = _maxSupply;

        if(_wantMaxSupply == false){
            nftMaxSupply = type(uint256).max;
        }

        NFT nft = new NFT(
            _uri,
            nftMaxSupply,
            _nftPrice,
            address(this),
            _creatorAddress
        );
    
        // Increment the number of NFT
        ++numOfNftCreated;

        // emit CreateNewCourse event
        emit CreateNewNft(_uri, _maxSupply, _nftPrice, address(this), _creatorAddress);

        // Add the new NFT to the mapping
        allNftData[_creatorAddress].push(
            NftStruct(
                _uri,
                _maxSupply,
                _nftPrice,
                address(this),
                _creatorAddress,
                address(nft)
            )
        );
        
        // search the profile by using creator address
        nftAddresses[_creatorAddress].push(address(nft));
    }

    /**
     * @dev function to set new onwer
     * @param _newOnwer address of new onwer
     */
    function setNewOwner(address _newOnwer) public onlyOwner {
        launchPadNftOwner = _newOnwer;
    }

    // function to withdraw the funds from Launchpad contract
    function withdraw(uint256 _amount, address _receiver) external payable onlyOwner{
        if(address(this).balance < _amount){
            revert NOT_ENOUGH_BALANCE();
        }

        (bool success, ) = _receiver.call{value: _amount}("");
        if(!success){
            revert TRANSFER_FAILED();
        }
        emit WithdrawMoney(_receiver , _amount);
    }


    // get the address of Launchpad contract
    function getAddressOfLaunchpadContract() public view returns (address) {
        return address(this);
    }

    // get the address of Launchpad contract owner`
    function getAddressOfLaunchpadOwner() public view returns (address) {
        return launchPadNftOwner;
    }

    // get the number of NFT Created
    function getNftCreated() public view returns(uint){
        return numOfNftCreated;
    }

    // get all NFTs with metadata by creator address
    function getNFTsWithMetadataCreatedByCreator(address _creatorAddress) public view returns(NftStruct[] memory){
        address[] memory _NFTAddresses = nftAddresses[_creatorAddress];
        uint length = _NFTAddresses.length;
        NftStruct[] memory _NFTs = new NftStruct[](length);
        for(uint i = 0; i < length; ++i){
            _NFTs[i] = allNftData[_creatorAddress][i];
        }
        return _NFTs;
    }

    // receive function is used to receive Ether when msg.data is empty
    receive() external payable {}

    // Fallback function is used to receive Ether when msg.data is NOT empty
    fallback() external payable {}
}