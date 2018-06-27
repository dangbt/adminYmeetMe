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
    InputGroupAddon,
    InputGroup,
    UncontrolledTooltip,
} from 'reactstrap';
import { BorderColor } from '@material-ui/icons'
import { _helper } from '../../Function/API';
import {  Editor } from './styled'

export default class Occupation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            modal: false,
            work: '',
            salary: 0,
            email: '',
            phone: '',
            web_page: '',
        }
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
    updateUser = () => {
        const user = {
            occupation: {
                work: this.state.work,
                salary: this.state.salary,
            },
            contact: {
                email: this.state.email,
                phone: this.state.phone,
                web_page: this.state.web_page,

            }
        }
        this.props.updateUser(user)
        this.toggleModal();
    }
    componentWillReceiveProps(nextProps) {
        const { occupation, contact } = nextProps;
        if (occupation) {
            this.setState({
                work: occupation.work,
                salary: occupation.salary,
            })
        }
        if (contact) {
            this.setState({
                email: contact.email,
                phone: contact.phone,
                web_page: contact.web_page
            })
        }
    }
    renderInput = (label, type, props) => {
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
                {type ?
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <Input placeholder="Amount" type="number" step="1" value={props}
                            disabled />
                        <InputGroupAddon addonType="append">.00</InputGroupAddon>
                    </InputGroup>
                    :
                    <InputGroup>
                        <Input type='text' value={props} disabled />
                    </InputGroup>
                }

            </FormGroup>
        )
    }
    renderInputChange = (label, type, props, onChange) => {
        return (
            <FormGroup>
                <Label >{label}</Label>
                {type ?
                    <InputGroup>
                        <Input placeholder={`Enter ${label.toLowerCase()}`} type="number" step="1" value={props}
                            onChange={(e) => onChange(e)} />
                        <InputGroupAddon addonType="append">VNĐ</InputGroupAddon>
                    </InputGroup>
                    :
                    <InputGroup>
                        <Input type='text' value={props} placeholder={`Enter ${label.toLowerCase()}`} onChange={(e) => onChange(e)} />
                    </InputGroup>
                }
            </FormGroup>
        )

    }

    render() {
        const { occupation, contact } = this.props;
        const { collapse, modal, } = this.state;
        const { work, salary, email, phone, web_page } = this.state;
        return (
            <div>
                <label onClick={this.toggleCollapse} style={{ fontSize: '3vw' }} className="h1 text-primary btn" id='userOccupation'><u>*User Occupation</u></label>
                <UncontrolledTooltip placement="top" target="userOccupation">
                    Click to show
                </UncontrolledTooltip >
                <Editor alt='Edit userOccupation' onClick={this.toggleModal} />
                <Collapse isOpen={collapse}>
                    {occupation ? <div>
                        {occupation.work ? this.renderInput('WORK', '', occupation.work) : this.renderInput('WORK', '')}
                        {occupation.salary ? this.renderInput('SALARY', 'number', ocupation.salary) : this.renderInput('SALARY', '')}
                        {contact ? <div>
                            {contact.email ? this.renderInput('EMAIL', '', contact.email) : this.renderInput('EMAIL', '')}
                            {contact.phone ? this.renderInput('PHONE', '', contact.phone) : this.renderInput('PHONE', '')}
                            {contact.web_page ? this.renderInput('WEB_PAGE', '', contact.web_page) : this.renderInput('WEB_PAGE', '')}
                        </div>
                            :
                            <div>
                                {this.renderInput('EMAIL', '')}
                                {this.renderInput('PHONE', '')}
                                {this.renderInput('WEB_PAGE', '')}
                            </div>}
                    </div>
                        :
                        <div>
                            {contact ? <div>
                                {contact.email ? this.renderInput('EMAIL', '', contact.email) : this.renderInput('EMAIL', '')}
                                {contact.phone ? this.renderInput('PHONE', '', contact.phone) : this.renderInput('PHONE', '')}
                                {contact.web_page ? this.renderInput('WEB_PAGE', '', contact.web_page) : this.renderInput('WEB_PAGE', '')}
                            </div>
                                :

                                <div>No data</div>
                            }
                        </div>


                    }

                </Collapse>

                <Modal isOpen={modal} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal} >User Occupation</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col >
                                {this.renderInputChange('WORK', '', work, (e) => this.setState({ work: e.target.value }))}
                                {this.renderInputChange('SALARY', 'number', salary, (e) => this.setState({ salary: e.target.value }))}
                                {this.renderInputChange('EMAIL', '', email, (e) => this.setState({ email: e.target.value }))}
                                {this.renderInputChange('PHONE', '', phone, (e) => this.setState({ phone: e.target.value }))}
                                {this.renderInputChange('WEB_PAGE', '', web_page, (e) => this.setState({ web_page: e.target.value }))}
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








