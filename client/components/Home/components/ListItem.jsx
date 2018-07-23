import React, { Component } from 'react';
import Item from './Item.jsx';
import styled from 'styled-components'
import {
  Card,  CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, CardGroup
} from 'reactstrap';
import { Table, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { _helper } from '../../Function/API';
import SearchInput, { createFilter } from 'react-search-input';
import Notification from '../../Notification/index.jsx';

const KEYS_TO_FILTERS = ['info.fullName']

const GroupWrapper = styled(CardGroup) `
justify-content: start;
  
`;
const DidWrapper = styled.div`
 `;

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      modal: false,
      userDel: ''
    }
  }
  
  toggle = (userDel) => {
    this.setState({
      modal: !this.state.modal, userDel: userDel
    });
  }
  deleteUser = () => {
    const { userDel } = this.state;
    debugger
    this.props.handleDelete(userDel)
    this.toggle();
  }


  likeUser = (userID) => {
    _helper.fetchAPI(
      '/likedUsers', { userID: userID }, [], 'POST'
    )
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          this.props.handleShowNotification(data.msg,'info')
        }
        if( status != 200) {
          this.props.handleShowNotification(data.msg,'warning')
        }
      })
  }

  searchUpdated = (term) =>  {
    this.setState({ searchTerm: term})
}
  render() {
    const {  searchTerm } = this.state;
    const { listUser, user } = this.props;
    const filteredUser = listUser.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
    
    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated}/>
        <Table hover bordered >
        <thead>
          <tr>
            <th>#</th>
            <th>FullName</th>
            <th>Info</th>
            <th>Occupation</th>
            <th>Contact</th>
            <th>Hobbies</th>
            <th>Friends</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {filteredUser && filteredUser.map((item, i) => (
           <tr key={item._id}>
           <th scope="row">{i+1}</th>
           <td>
              <p>{item.info && item.info.fullName}</p>
              <img src={item.avatar ? item.avatar : '../../../assets/default-avatar.png'} style={{width: 100, height: 100}} />
              <p>Username: {item.username && item.username} </p>
              <p>Password: {item.password && item.password} </p>
              
           </td>
           <td>
              <p>Gender: {item.info && item.info.gender ? item.info.gender :  'No data'}</p>
              <p>BOD: {item.info && item.info.birthday ? item.info.birthday :  'No data'}</p>
              <p>Height: {item.info && item.info.height ? item.info.height :  'No data'}</p>
              <p>Weight: {item.info && item.info.weight ? item.info.weight :  'No data'}</p>
              <p>Marial Status: {item.info && item.info.marialStatus ? item.info.marialStatus :  'No data'}</p>
              <p>Intruduce: {item.info && item.info.introduce ? item.info.introduce :  'No data'}</p>
              <p>Knowledge: {item.info && item.info.knowledge ? item.info.knowledge :  'No data'}</p>
              <p>City: {item.info && item.info.address ? item.info.address :  'No data'}</p>
              <p>Country: {item.info && item.info.country ? item.info.country :  'No data'}</p>
           </td>
           <td>
              <p>Work: {item.occupation && item.occupation.work ? item.occupation.work : 'No data'}</p>
              <p>Salary: {item.occupation && item.occupation.salary ? item.occupation.salary : 'No data'}</p>
           </td>
           <td>
              <p>Email: {item.contact && item.contact.email ? item.contact.email :  'No data'}</p>
              <p>Phone: {item.contact && item.contact.phone ? item.contact.phone :  'No data'}</p>
              <p>Web Page: {item.contact && item.contact.web_page ? item.contact.web_page :  'No data'}</p>
           </td>
           <td>
             {item.hobbies.length >0 ? item.hobbies.map((item, i) => (
               <p key={i} >{i+1}.{' '}{item.content}</p>
             ))
             :
             'No data'
            }
           </td>
           <td>
             {item.friends.length > 0 ? item.friends.map((item, i) => (
               <p key={i} >{i+1}.{' '}{item.info.fullName}</p>
             ))
             :
             'No data'
            }
             
           </td>
           <td><Button outline color='danger' onClick={() => this.toggle(item._id)} >Xoá</Button></td>
         </tr>
        ))
        }
        </tbody>
        </Table>
        <Modal isOpen={this.state.modal} >
          <ModalBody>
            Bạn có chắc muốn xoá?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteUser}>Yes</Button>{' '}
            <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
