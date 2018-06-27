import React, { Component } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
  InputGroup,
} from 'reactstrap';
import styled from 'styled-components'
import { ThumbUp } from '@material-ui/icons'

const CardWrapper = styled(Card) `
  width:250px;
  margin: 0 10px;
`;
const CardImgWrapper = styled(CardImg) `
  height: 250px ;
`;
const CardTitleWrapper = styled(CardTitle) `
  text-decoration: underline;
  color: blue;
  cursor: pointer;
`;

export default class Item extends Component {
  state = {
    modal: false,
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  renderInput = (label, props) => {
    if (!props) {
      return (<FormGroup>
        <Label >{label}</Label>
        <InputGroup>
          <Input type='text' value='No data' disabled />
        </InputGroup>
      </FormGroup>)
    }
    return (
      <FormGroup>
        <Label >{label}</Label>
        <InputGroup>
          <Input type='text' value={props} disabled />
        </InputGroup>
      </FormGroup>
    )
  }
  renderInputArea = (label, props) => {
    if (!props) {
      return (<FormGroup>
        <Label >{label}</Label>
        <InputGroup>
          <Input type='text' value='No data' disabled />
        </InputGroup>
      </FormGroup>)
    }
    return (
      <FormGroup>
        <Label >{label}</Label>
        <InputGroup>
          <Input type='textarea' value={props} disabled />
        </InputGroup>
      </FormGroup>
    )
  }
  renderInputBOD = (label, props) => {
    if (!props) {
      return (<FormGroup>
        <Label >{label}</Label>
        <InputGroup>
          <Input type='text' value='No data' disabled />
        </InputGroup>
      </FormGroup>)
    }
    return (
      <FormGroup>
        <Label >{label}</Label>
        <InputGroup>
          <Input type='date' value={moment(props).format('YYYY-MM-DD')} disabled />
        </InputGroup>
      </FormGroup>
    )
  }

  render() {
    const { user, likeUser, accept, addFriend, friend } = this.props;
    var imgSrc = user.avatar ? user.avatar : "../../../assets/default-avatar.png";
    return (
      <div>
        <CardWrapper>
          <CardImgWrapper src={imgSrc} alt="Card image cap" />
          <CardBody>
            <CardTitleWrapper onClick={this.toggle}>Name : {user.info.fullName}</CardTitleWrapper>
            <CardSubtitle>City : {user.info.address}</CardSubtitle>
            <CardText>Birthday : {user.info.birthday ? moment(user.info.birthday).format('MMM Do YY') : 'MM DD YY'}</CardText>
            <CardText>Intruduce : {user.info.introduce ? user.info.introduce : 'Friendly and like make friend'}</CardText>

            {
              accept ? (<Button onClick={() => addFriend()} >Accept</Button>) :  ( friend ? '' : <Button outline color='info' onClick={() => likeUser(user._id)} > <ThumbUp color='primary' /></Button>)
            }
          </CardBody>
        </CardWrapper>
        <div>
          <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
            toggle={this.toggle} className={`${this.props.className} w-75 mw-100`}>
            <ModalHeader toggle={this.toggle}>Information {user.info.fullName} </ModalHeader>
            <ModalBody>
              <Row>
                <Col sx='6' >
                  {user.info.fullName ? this.renderInput('FULL NAME', user.info.fullName) : this.renderInput('FULL NAME')}
                  {user.info.gender ? this.renderInput('GENDER', user.info.gender) : this.renderInput('GENDER')}
                  {user.info.birthday ? this.renderInputBOD('BOD', user.info.birthday) : this.renderInput('BOD')}
                  {user.info.address ? this.renderInput('CITY', user.info.address) : this.renderInput('CITY')}
                  {user.info.weight ? this.renderInput('WEIGHT', user.info.weight.toString() + 'KG') : this.renderInput('WEIGHT')}
                  {user.info.height ? this.renderInput('HEIGHT', user.info.height.toString() + 'CM') : this.renderInput('HEIGHT')}
                  {user.info.introduce ? this.renderInputArea('INTRODUCE', user.info.introduce) : this.renderInputArea('INTRODUCE')}
                </Col>
                <Col sx='6'>
                  {user.info.knowledge ? this.renderInput('KNOWLEDGE', user.info.knowledge) : this.renderInput('KNOWLEDGE')}
                  {user.info.marialStatus ? this.renderInput('MARIALSTATUS', user.info.marialStatus) : this.renderInput('MARIALSTATUS')}
                  {user.contact && user.contact.email ? this.renderInput('EMAIL', user.contact.email) : this.renderInput('EMAIL')}
                  {user.contact && user.contact.phone ? this.renderInput('PHONE', user.contact.phone) : this.renderInput('PHONE')}
                  {user.contact && user.contact.web_page ? this.renderInput('WEB_PAGE', user.contact.web_page) : this.renderInput('WEB_PAGE')}
                  {user.occupation && user.occupation.work ? this.renderInput('WORK', user.occupation.work) : this.renderInput('WORK')}
                  {user.occupation && user.occupation.salary ? this.renderInput('SALARY', user.ocupation.salary) : this.renderInput('SALARY')}
                </Col>
              </Row>
              <Label >HOBBIES  </Label>
              {
                user.hobbies && user.hobbies.length === 0 ? <Input type='text' value='No data' disabled /> :
                  user.hobbies && user.hobbies.map((item, i) => {
                    return i == 0 ? <Input type="text" placeholder="your hobby" value={(i + 1) + '. ' + item.content}
                      key={item} disabled /> :
                      <Input className='mt-3' type="text" placeholder="your hobby" value={(i + 1) + '. ' + item.content}
                        key={item} disabled />
                  })
              }
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>OK</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>

    )
  }
}
