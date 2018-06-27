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
    UncontrolledTooltip
} from 'reactstrap';
import { _helper } from '../../Function/API';
import { BtnPlus, InputHobby, FormPlus, BtnAdd, FormHobbies, Editor } from './styled'
import './style.scss'


export default class Hobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            modal: false,
            listHobbies: [],
            listHobbiesAdd: [],
            tempHobby: '',
            valueSelect: [],
            togglePlus: false

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
    getHobby = () => {
        _helper.fetchGET('/hobbies')
            .then((response) => {
                const { status, data } = response;
                if (response.status == 200) {
                    this.setState({
                        listHobbies: data,
                    })


                }
            })

    }
    updateUser = () => {
        const { valueSelect, listHobbiesAdd } = this.state;
        const listHobbies = listHobbiesAdd.map(item => item._id)
        const newList = valueSelect.concat(listHobbies)
        debugger
        const user = {
            hobbies: newList
        }
        this.props.updateUser(user)
        this.toggleModal();
    }
    hanlderClickAdd = () => {
        const { tempHobby } = this.state;
        const { user } = this.props;
        let whoLikeThis= [user._id];
        debugger
        
        _helper.fetchAPI('/hobbies',{ content : tempHobby, whoLikeThis : whoLikeThis },[], 'POST')
        .then(response => {
            const { data, status } = response;
            debugger
            if( status == 200 ) {
                const { listHobbiesAdd } = this.state;
                let newList = listHobbiesAdd;
                newList.push(data);
                this.setState({ listHobbiesAdd: newList, tempHobby: '', togglePlus: false })
            }

        })
    }
    handleKeyPress = (e) => {
      if (e.key == 'Enter') {
          this.hanlderClickAdd();
      } 
    }
    handleClickBtnPlus = () => {
        const { listHobbiesAdd } = this.state;

        if (listHobbiesAdd.length < 3) {
            this.setState({ togglePlus: !this.state.togglePlus })
        }
    }
    componentDidMount() {
        this.getHobby();
    }
    render() {
        const { collapse, modal, } = this.state;
        const { listHobbies, valueSelect, togglePlus, tempHobby, listHobbiesAdd } = this.state;
        const { hobbies } = this.props;
        return (
            <div>
                <label onClick={this.toggleCollapse} style={{ fontSize: '3vw' }} className="h1 text-primary btn" id='userHobby' ><u>*User Hobby</u></label>
                <UncontrolledTooltip placement="top" target="userHobby">
                    Click to show
                </UncontrolledTooltip >
                <Editor alt='Edit userHobby' onClick={this.toggleModal} />
                <Collapse isOpen={collapse}>
                            <Label >HOBBIES  </Label>
                            {
                              hobbies && hobbies.length === 0 ? <Input type='text' value='No data' disabled /> :
                                    hobbies && hobbies.map((item, i) => {
                                      return  i == 0 ? <Input  type="text" placeholder="your hobby" value={(i + 1) + '. ' + item.content}
                                        key={item} disabled /> : 
                                         <Input className='mt-3' type="text" placeholder="your hobby" value={(i + 1) + '. ' + item.content}
                                            key={item} disabled />

                                    })
                            }
                </Collapse>
                <Modal isOpen={modal} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal} >Edit your hobbies</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label >Choose hobbies</Label>
                            <Input type="select" multiple onChange={(e) => {
                                var options = e.target.options;
                                var value = [];
                                for (var i = 0, l = options.length; i < l; i++) {
                                    if (options[i].selected) {
                                        value.push(options[i].value);
                                    }
                                    this.setState({
                                        valueSelect: value
                                    })
                                }
                            }} >
                                {listHobbies.map((item, i) =>
                                    <option key={item._id} value={item._id} >{i + 1}.{item.content}</option>
                                )
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <FormHobbies>
                                {listHobbiesAdd && listHobbiesAdd.map((item, i) => (
                                    <div>{i + 1}.{item.content}</div>
                                ))}
                            </FormHobbies>
                            <FormPlus className={togglePlus ? 'display' : 'none'} >
                                <InputHobby value={tempHobby} onChange={(e) => this.setState({ tempHobby: e.target.value })} onKeyPress={this.handleKeyPress} />
                                <BtnAdd onClick={this.hanlderClickAdd} >ADD</BtnAdd>
                            </FormPlus>

                            <BtnPlus onClick={this.handleClickBtnPlus} className={listHobbiesAdd.length > 2 ? 'none': ''} >+</BtnPlus>
                        </FormGroup>
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

