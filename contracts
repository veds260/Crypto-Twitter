// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract TwitterContract{

    struct Tweet{
        uint id;
        address author;
        string content;
        uint createdAt;
    }

    struct Message{
        uint id;
        string content;
        address from;
        address to;
        uint createdAt;
    }

    mapping(uint=>Tweet) public tweets;
    mapping(address=>uint[]) public tweetsOf;
    mapping(address=>Message[]) public conversations;
    mapping(address=>mapping(address=>bool)) public operators;
    mapping(address=>address[]) public following;
    mapping(address => address[]) public followers;


    uint nextId;
    uint nextMessageId;

    function _tweet(address _from, string memory _content) internal{
        tweets[nextId]=Tweet(nextId, _from, _content, block.timestamp);
        nextId+=1;
    }

    function _sendMessage(address _from, address _to, string memory _content) internal{
        conversations[_from].push(Message(nextMessageId, _content, _from, _to, block.timestamp));
        nextMessageId+=1;
    }


    function tweet(string memory _content) public{
        _tweet(msg.sender, _content);
    }

    function tweet(address _from, string memory _content) public{
        _tweet(_from, _content);
    } 

    //We can use same name for multiple functions due to the concept of polymorphism
    // According to polymorphism, we can make multiple functions of the same name if the function has either different types of parameters or different numbers of parameters

    function sendMessage(address _to, string memory _content) public{
        _sendMessage(msg.sender, _to, _content);
    }

    function sendMessage(address _from, address _to, string memory _content) public{
        _sendMessage(_from, _to, _content);
    }

    function follow(address _followed) public{
        require(_followed != msg.sender, "You cannot follow yourself");
        following[msg.sender].push(_followed);
        followers[_followed].push(msg.sender);
    }

    function unfollow(address _followed) public {
        _removeFromArray(following[msg.sender], _followed);
        _removeFromArray(followers[_followed], msg.sender);
    }

    function _removeFromArray(address[] storage array, address value) internal {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == value) {
                array[i] = array[array.length - 1];
                array.pop();
                break;
            }
        }
    }

    function allow(address _operator) public{
        operators[msg.sender][_operator]=true;
    }

    function disallow(address _operator) public{
        operators[msg.sender][_operator]=false;
    }

    function getLatestTweet(uint count) public view returns(Tweet[] memory){
        require(count>0 && count<=nextId, "Count is not valid");
        Tweet[] memory _tweets= new Tweet[](count);

        uint j;

        for(uint i=nextId-count; i<nextId; i++){
            Tweet storage _structure= tweets[i];
            _tweets[j]=Tweet(_structure.id, _structure.author, _structure.content, _structure.createdAt);
            j++;

        }
        return _tweets;
    }

    function getLatestofUser(address _user, uint count) public view returns(Tweet[] memory){
        
        Tweet[] memory _tweets= new Tweet[](count);
        uint[] memory ids= tweetsOf[_user];
        require(count>0 && count<=ids.length, "Count is not valid");
        uint j;

        for(uint i=ids.length-count; i<ids.length; i++){
            Tweet storage _structure= tweets[ids[i]];
            _tweets[j]=Tweet(_structure.id, _structure.author, _structure.content, _structure.createdAt);
            j++;

        }
        return _tweets;
    }

    function getNextId() public view returns (uint) {
        return nextId;
    }

    function getNextMessageId() public view returns (uint) {
        return nextMessageId;
    }

    function getMessages(address _user) public view returns (Message[] memory){
        return conversations[_user];
    }

    function getFollowing(address _user) public view returns (address[] memory) {
        return following[_user];
    }

    function getFollowers(address _user) public view returns (address[] memory) {
        return followers[_user];

}
}
