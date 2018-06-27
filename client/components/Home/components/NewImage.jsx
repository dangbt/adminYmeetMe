import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, CardGroup, Col, Input, Label, Row, CardImgOverlay
} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert  } from 'reactstrap';
import { _helper } from '../../Function/API';
import moment from 'moment';
import { ThumbUp, TrendingFlat } from '@material-ui/icons';
const GroupWrapper = styled(CardGroup) `
  justify-content: start;
`;

const CardWrapper = styled(Card) `
  width:250px;
  height: 285px;
  max-width:250px !important;
  min-width:250px !important;
  margin: 0 10px;
  img {
    height: 235px !important;
  }
`;
const DidWrapper = styled.div`
 `;
const BtnAddPic = styled(Button) `
    margin: 20px auto;
    width: 400px;
    display: flex !important;
    justify-content: center;
    font-size: 26px;
`;
const AlertWrapper = styled(Alert)`
  display: flex;
  text-align: center;
  align-items: center;
  position: relative;
  bottom: -25px;
`;
const Image = styled.img`
    min-width: 180px;
    min-height: 180px;
`;

export default class NewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      modal: false,

    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file.size < 50000) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          avatar: reader.result
        });
      }
      reader.readAsDataURL(file)
    }
    else
      this.props.handleShowNotification('Kích thước hình ảnh quá lớn. Chỉ được upload hình nhỏ hơn 50KB !!', 'warning');
  }



  handleSaveImage = () => {
    const { avatar, messsageImage } = this.state;

    if (avatar && messsageImage) {
      const newImage = {
        imageURL: avatar,
        message: messsageImage,
        userID: this.props.user._id
      }
      _helper.fetchAPI(
        '/images', newImage, [], 'POST'
      )
        .then((response) => {
          const { data, status } = response;
          if (data.result == 1) {
            this.setState({modal:false},() => this.props.getAllImage());
            this.props.handleShowNotification('Upload thành công !!!', 'info');
          }
        })
    } else {
      this.props.handleShowNotification('Warning: Avatar and Message is required', 'warning');
    }
  }

 
  render() {
    const { avatar } = this.state;
    const { listImage, user } = this.props;
    let xhtml = avatar ? avatar : '../../../../assets/default-avatar.png';
    return (
      <div>
        <GroupWrapper>
        { listImage && listImage.map( (item) => (
          <CardWrapper inverse key={item._id} >
            <CardImg width="100%" src={item.imageURL} alt="Card image cap" />
              <CardImgOverlay >
                  <small>{item.message}</small>
                <CardText style={{ position: 'absolute', bottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '90%',}}>
                  <small className="text-muted">{moment(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a')} </small>
                </CardText>
              </CardImgOverlay>
            <div style={{color: 'black', textAlign: 'center'}}>
              <CardText><span style={{color: 'blue'}}>{item.userID.info && item.userID.info.fullName}{'-'}{item.userID.info && moment(item.userID.info.birthday).format('YYYY')}</span>{'  '} {item.userID.info && item.userID.info.address}</CardText>
            </div>
        </CardWrapper>
        ))}
        </GroupWrapper>
        <div>
        </div>
      </div>
    )
  }
}
