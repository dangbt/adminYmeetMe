import React, { Component } from 'react';
import styled from 'styled-components'
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, CardGroup
} from 'reactstrap';
import SearchInput, { createFilter } from 'react-search-input';
import ItemFriend from './Item.jsx';
const KEYS_TO_FILTERS = ['info.fullName']

const GroupWrapper = styled(CardGroup) `
  width: 100%;
  justify-content: start;
  
`;
const DidWrapper = styled.div`
  display: flex;
 
 `;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

`;
const H3 = styled.h3`
  width: 300px;
`;
const Img = styled.img`
  &::before {
    transform: rotate(10deg);
    border: 1px solid gray;
  }
  &::after {
    transform: rotate(10deg);
    border: 1px solid gray;
  }
`;

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',

    }
  }
  
  searchUpdated = (term) => {
    this.setState({ searchTerm: term })
  }
  componentDidMount = () => {
  }


  render() {
    const {  searchTerm } = this.state;
    const { listFriends } = this.props;
    const filteredUser = listFriends.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    return (
      <div style={{width: '100%'}}  >
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <DidWrapper>
          <GroupWrapper>
            { filteredUser.length > 0 ? filteredUser.map((user, i) => {
                return <ItemFriend  user={user} key={user._id} friend />
            })
            :
            (
            <ContentWrapper >
              <Img src='../../../assets/default-avatar.png' />
              <H3>Những người bạn của bạn sẽ được hiển thị ở đây. Hãy kết bạn và 2 bạn có thể trò chuyện!</H3>
            </ContentWrapper>
             )
          }
          </GroupWrapper>
        </DidWrapper>
      </div>

    )
  }
}
