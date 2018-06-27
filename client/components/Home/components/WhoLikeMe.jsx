import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Item from './Item.jsx';
import styled from 'styled-components'
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, CardGroup
} from 'reactstrap';
import { _helper } from '../../Function/API';
import SearchInput, { createFilter } from 'react-search-input';

const GroupWrapper = styled(CardGroup) `
  justify-content: start;
  margin-left: 15px;
`;
const DidWrapper = styled.div`
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

const KEYS_TO_FILTERS = ['likeBy.info.fullName'];

export default class WhoLikeMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      searchTerm: '',
     
    }
  }
 
  searchUpdated = (term) =>  {
    this.setState({ searchTerm: term })
}

  render() {
    const {  searchTerm } = this.state;
    const  { listLikeMe } = this.props;
    const filteredUser = listLikeMe ?  listLikeMe.filter(createFilter(searchTerm, KEYS_TO_FILTERS)) : [];
    
    return (
      <div style={{width: '100%'}} >
        <SearchInput className="search-input" onChange={this.searchUpdated}/>
        <DidWrapper>
          <GroupWrapper>
            { filteredUser.length ? filteredUser.map((user, i) => {
                return <Item addFriend={() => this.props.addFriend(user.userID)} user={user.userID} key={user._id} accept={true} />
            })
            :
            <ContentWrapper >
              <Img src='../../../assets/default-avatar.png' />
              <H3>Những người đã thích bạn sẽ được hiển thị ở đây. Hãy thích lại họ và 2 bạn có thể trò chuyện!</H3>
            </ContentWrapper>
          }
          </GroupWrapper>
        </DidWrapper>
      </div>
    )
  }
}
