import React, { Component } from 'react';
import moment from 'moment';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    FormGroup,
    Input,
    Collapse,
    Col,
    Row,
    UncontrolledTooltip,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import styled from 'styled-components'
import { BorderColor } from '@material-ui/icons'
import { _helper } from '../../Function/API';
import listCountry from '../../../container/coutry';

const Editor = styled(BorderColor) `
    cursor: pointer;
`


export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            modal: false,
            info: this.props.info,
            fullName: '',
            gender: 'Male',
            height: '',
            weight: 0,
            marialStatus: '',
            knowledge: '',
            address: '',
            country: '',
            introduce: '',
            avatar: ''

        }
    }
    handleChangeSelect = (e) => {
        this.setState({ country: e.target.value })

    }
    toggleCollapse = () => {
        this.setState({
            collapse: !this.state.collapse
        })
    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleChangeImage = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        debugger
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
            this.props.showMessage('Kích thước hình ảnh quá lớn. Chỉ được upload hình nhỏ hơn 50KB !!');
    }
    updateUser = () => {
        const user = {
            info: {
                fullName: this.state.fullName,
                gender: this.state.gender,
                birthday: this.state.birthday,
                height: this.state.height,
                weight: this.state.weight,
                marialStatus: this.state.marialStatus,
                knowledge: this.state.knowledge,
                address: this.state.address,
                country: this.state.country,
                introduce: this.state.introduce,
            },
            avatar: this.state.avatar
        }
        this.props.updateUser(user);

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
                    <Input type='text' placeholder={label.toLowerCase()} value={props} disabled />
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
                    <Input type='textarea'placeholder={label.toLowerCase()} value={props} disabled />
                </InputGroup>
            </FormGroup>
        )
    }
    renderInputNumber = (label, props) => {
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
                    <Input placeholder={label.toLowerCase()} type="number" step="1" value={props}
                        disabled />
                    <InputGroupAddon addonType="append">{label == 'HEIGHT' ? 'Centimet' : 'Kg'}</InputGroupAddon>
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
                    <Input type='date' placeholder={label.toLowerCase()} value={moment(props).format('YYYY-MM-DD')} disabled />
                </InputGroup>
            </FormGroup>
        )
    }

    renderInputChange = (label, type, props, onChange) => {
        if (type == 'date') {
            return (
                <FormGroup>
                    <Label >{label}</Label>
                    <InputGroup>
                        <Input type='date' placeholder={label.toLowerCase()} value={moment(props).format('YYYY-MM-DD')} onChange={(e) => onChange(e)} />
                    </InputGroup>
                </FormGroup>)
        }
        if (type == 'number') {
            return (
                <FormGroup>
                    <Label >{label}</Label>
                    <InputGroup>
                        <Input placeholder={label.toLowerCase()} type="number" step="1" value={props} onChange={(e) => onChange(e)}
                        />
                        <InputGroupAddon addonType="append">{label == 'HEIGHT' ? 'Centimet' : 'Kg'}</InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            )
        }
        return (
            <FormGroup>
                <Label >{label}</Label>
                <InputGroup>
                    <Input type='text' placeholder={label.toLowerCase()} value={props} onChange={(e) => onChange(e)} />
                </InputGroup>
            </FormGroup>
        )

    }
    renderInputChange = (label, type, props, onChange) => {
        if (type == 'date') {
            return (
                <FormGroup>
                    <Label >{label}</Label>
                    <InputGroup>
                        <Input type='date' placeholder={label.toLowerCase()} value={moment(props).format('YYYY-MM-DD')} onChange={(e) => onChange(e)} />
                    </InputGroup>
                </FormGroup>)
        }
        if (type == 'number') {
            return (
                <FormGroup>
                    <Label >{label}</Label>
                    <InputGroup>
                        <Input placeholder={label.toLowerCase()} type="number" step="1" value={props} onChange={(e) => onChange(e)}
                        />
                        <InputGroupAddon addonType="append">{label == 'HEIGHT' ? 'Centimet' : 'Kg'}</InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            )
        }
        if (type == 'area') {
            return (
                <FormGroup>
                    <Label >{label}</Label>
                    <InputGroup>
                        <Input placeholder={label.toLowerCase()} type='textarea' value={props} onChange={(e) => onChange(e)} />
                    </InputGroup>
                </FormGroup>
            )
        }
        return (
            <FormGroup>
                <Label >{label}</Label>
                <InputGroup>
                    <Input type='text' placeholder={label.toLowerCase()} value={props} onChange={(e) => onChange(e)} />
                </InputGroup>
            </FormGroup>
        )

    }
    renderInputChangeSelect = (label, data, props, onChange) => {
        return (
            <FormGroup>
                <Label>{label}</Label>
                <Input type="select" value={props} placeholder={label.toLowerCase()} onChange={(e) => onChange(e)} >
                    {data.map((item, i) => {
                        return <option key={i}>{item.name ? item.name : item}</option>
                    })}
                </Input>
            </FormGroup>
        )
    }
    handleSelect = () => {
        const { country } = this.state;
        return listCountry.filter((item) =>
            item.name === country
        )
    }

    componentWillReceiveProps(nextProps) {
        const { info, avatar } = nextProps;
        this.setState({
            fullName: info.fullName,
            gender: info.gender,
            birthday: info.birthday,
            height: info.height,
            weight: info.weight,
            marialStatus: info.marialStatus,
            knowledge: info.knowledge,
            address: info.address,
            country: info.country,
            introduce: info.introduce,
            avatar: avatar
        })
    }


    render() {
        const { info } = this.props;
        const listCity = this.handleSelect();
        const selectCountry = ['Cà Mau', 'TP.HCM', 'Hà Nội', 'Quãng Ngãi', 'Viet Nam'];
        const genderList = ['Male', 'Female']
        const { collapse, modal } = this.state;
        const { fullName, gender, birthday, height, weight, marialStatus, introduce, knowledge, address, country, avatar } = this.state;
        let xhtml = avatar ? avatar : '../../../../assets/default-avatar.png';
        return (
            <div>
                <label onClick={this.toggleCollapse} style={{ fontSize: '3vw' }} className="h1 text-primary font-size btn" id='userInfo' ><u >*User Info</u></label>
                <UncontrolledTooltip placement="top" target="userInfo">
                    Click to show
                </UncontrolledTooltip >
                <Editor alt='Edit userInfo' onClick={this.toggleModal} />
                <Collapse isOpen={collapse}>
                    <Row>
                        <Col xs={6} >
                            {info.fullName ? this.renderInput('FULL NAME', info.fullName) : this.renderInput('FULL NAME')}
                            {info.gender ? this.renderInput('GENDER', info.gender) : this.renderInput('GENDER')}
                            {info.birthday ? this.renderInputBOD('BOD', info.birthday) : this.renderInput('BOD')}
                            {info.address ? this.renderInput('CITY', info.address) : this.renderInput('CITY')}
                            {info.country ? this.renderInput('COUNTRY', info.country) : this.renderInput('COUNTRY')}
                        </Col>
                        <Col xs={6}>
                            {info.height ? this.renderInputNumber('HEIGHT', info.height) : this.renderInputNumber('HEIGHT')}
                            {info.weight ? this.renderInputNumber('WEIGHT', info.weight) : this.renderInputNumber('WEIGHT')}
                            {info.knowledge ? this.renderInput('KNOWLEDGE', info.knowledge) : this.renderInput('KNOWLEDGE')}
                            {info.marialStatus ? this.renderInput('MARIALSTATUS', info.marialStatus) : this.renderInput('MARIALSTATUS')}
                            {info.introduce ? this.renderInputArea('INTRODUCE', info.introduce) : this.renderInput('INTRODUCE')}

                        </Col>
                    </Row>
                </Collapse>
                <Modal isOpen={modal} toggle={this.toggleModal} className={this.props.className} style={{maxWidth: 700}} >
                    <ModalHeader toggle={this.toggleModal} >User info</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="4" >
                                <img src={xhtml} alt='avatar' className='img-thumbnail' />
                                <input style={{cursor: 'pointer', outline: 'none'}} type='file' onChange={(e) => this.handleChangeImage(e)} />
                            </Col>
                            <Col xs="4">

                                {this.renderInputChange('FULLNAME', '', fullName, (e) => this.setState({ fullName: e.target.value }))}
                                {this.renderInputChangeSelect('GENDER', genderList, gender, (e) => this.setState({ gender: e.target.value }))}
                                {this.renderInputChange('BOD', 'date', birthday, (e) => this.setState({ birthday: e.target.value }))}
                                {this.renderInputChangeSelect('COUNTRY', listCountry, country, (e) => this.setState({ country: e.target.value }))}
                                {this.renderInputChangeSelect('ADDRESS', listCity[0] ? listCity[0].city : [], address, (e) => this.setState({ address: e.target.value }))}
                            </Col>
                            <Col xs='4'>
                                {this.renderInputChange('HEIGHT', 'number', height, (e) => this.setState({ height: e.target.value }))}
                                {this.renderInputChange('WEIGHT', 'number', weight, (e) => this.setState({ weight: e.target.value }))}
                                {this.renderInputChange('KNOWLEDGE', '', knowledge, (e) => this.setState({ knowledge: e.target.value }))}
                                {this.renderInputChange('MARIALSTATUS', '', marialStatus, (e) => this.setState({ marialStatus: e.target.value }))}
                                {this.renderInputChange('INTRODUCE', 'area', introduce, (e) => this.setState({ introduce: e.target.value }))}


                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateUser} >Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

