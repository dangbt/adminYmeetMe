import React, { Component } from 'react';
import { _helper } from '../Function/API.js';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { SignupWrapper, Header, Content, BtnSubmit, ColWrapper, LinkWrapper } from './styled';
import listCountry from '../../container/coutry';
import Notification from '../Notification/index.jsx';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullName: '',
      email: '',
      phone: '',
      address: 'Tp.HCM',
      country: 'Viet Nam',
      hobies: [],
      authenticate: false,
      show: false,
      message: '',
      type: 'info'
    }
  }
  setTimeOutNotification = () => {
    setTimeout( ()=> this.setState({show: false}), 1)
  }
  signup = (e) => {
    e.preventDefault();
    const { username, password, fullName, address, country, email, phone } = this.state;
    const user = {
      info: {
        fullName: fullName,
        address: address,
        country: country
      },
      username: username,
      password: password,
      contact: {
        email: email,
        phone: phone
      }
    }
    _helper.fetchAPI(
      '/signup',
      user,
      [], 'POST')
      .then((response) => {
        const { data, status } = response;
        if (data.result == 0) {
          this.setState({show: true, message: data.msg, type: 'warning'}, () => this.setTimeOutNotification() )
        }
        if (data.result == 1) {
          setTimeout(()=> this.setState({authenticate: true}), 2000)
          this.setState({show: true, message: data.msg, type: 'info'}, () => this.setTimeOutNotification())
        }
        
      })
      .catch((error) => {
        console.log(error);
      })


  }
  renderInput = (label, onChange) => (
    <FormGroup row>
      <Label for="exampleEmail" sm={2}>{label}</Label>
      <Col sm={10}>
        <Input type={label === 'Password' ? 'password' : 'text'} placeholder={`Enter ${label.toLowerCase()}`} required
          onChange={(e) => onChange(e)}
        />
      </Col>
    </FormGroup>
  )
  handleSelect = () => {
    const { country } = this.state;
    return listCountry.filter((item) =>
      item.name === country
    )
  }
  renderInputChangeSelect = (label, data, props, onChange) => {
    return (
      <FormGroup row>
        <Label sm={2}>{label}</Label>
        <Col sm={10}>
          <Input type="select" value={props} onChange={(e) => onChange(e)}  >
            {data.map((item, i) => {
              return <option key={i} >{item.name ? item.name : item}</option>
            })}
          </Input>
        </Col>
      </FormGroup>
    )
  }

  render() {
    const { address, country, message, type, show } = this.state;
    const listCity = this.handleSelect();
    if (this.state.authenticate) {
      return <Redirect to='login'></Redirect>
    }
    return (
      <SignupWrapper>
        <LinkWrapper to='/' ><Header>WELCOME TO YOU MEET ME</Header></LinkWrapper>
        <Content>
          <Form onSubmit={this.signup}>
            {this.renderInput('UserName', (e) => this.setState({ username: e.target.value }))}
            {this.renderInput('Password', (e) => this.setState({ password: e.target.value }))}
            {this.renderInput('FullName', (e) => this.setState({ fullName: e.target.value }))}
            {this.renderInput('Email', (e) => this.setState({ email: e.target.value }))}
            {this.renderInput('Phone', (e) => this.setState({ phone: e.target.value }))}

            {this.renderInputChangeSelect('Country', listCountry, country, (e) => this.setState({ country: e.target.value }))}
            {this.renderInputChangeSelect('City', listCity[0] ? listCity[0].city : [], address, (e) => this.setState({ address: e.target.value }))}

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <BtnSubmit>Submit</BtnSubmit>
              </Col>
            </FormGroup>
          </Form>
          <ColWrapper sm={{ size: 10, offset: 2 }}>
            <Link to='/login'>Log In</Link>
          </ColWrapper>
        </Content>
        <Notification show={show} message={message} type={type} time={1900} />
      </SignupWrapper>
      
    )
  }
}
