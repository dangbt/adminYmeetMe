import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListItem from './components/ListItem.jsx';
import NewImage from './components/NewImage.jsx';
import { withStyles } from '@material-ui/core/styles';
import { _helper } from '../Function/API';
import Notification from '../Notification/index.jsx';
import moment from 'moment';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});
Nav.propTypes = {
    tabs: PropTypes.bool,
    pills: PropTypes.bool,
    card: PropTypes.bool,
    justified: PropTypes.bool,
    fill: PropTypes.bool,
    vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    horizontal: PropTypes.string,
    navbar: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
  }
class TabHome extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      listLikeMe: [],
      listUser: [],
      listFriends: [],
      show: false,
      message: '',
      type: 'info',
      listImage: []
    };
  }
  getListLikeMe = () => {
    _helper.fetchGET(
      '/usersLikeMe', []
    )
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          this.setState({ listLikeMe: data.data })
        }
      })
  }
  likeUser = (userID) => {
    _helper.fetchAPI(
      '/likedUsers', { userID: userID }, [], 'POST'
    )
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          this.handleShowNotification(data.msg,'info');
        }
        if( status != 200) {
          this.handleShowNotification(data.msg,'warning')
        }
      })
  }
  getUser = () => {
    _helper.fetchGET(
      '/users', []
    )
      .then((response) => {
        const { data, status } = response;
        if (status == 200) {
          debugger
          this.setState({ listUser: data })
        }
      })

  }
  getFriends = () => {
    const { user } = this.props;
    _helper.fetchAPI(
      '/users/getFriends', { _id: user._id }
    )
      .then((response) => {
        const { data, status } = response;
        if (status == 200) {
          this.setState({ listFriends: data.data[0].friends })

        }
      })

  }
  addFriend = (userID) => {
    _helper.fetchAPI(
      '/users/addFriend', { userID: userID }, [], 'POST'
    )
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
         this.getListLikeMe();
         this.getFriends();
        }
      })
  }
  getAllImage = () => {
    _helper.fetchGET(
      '/images', []
    )
      .then((response) => {
        const { data, status } = response;
        if ( status == 200 ) {
          this.setState({listImage: data})
        }
      })
  } 
  badgeImage = () => {
    const { listImage } = this.state;
    const badge = listImage.filter(item => 
      moment(item.updatedAt).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')
     
    )
    return badge.length;
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  setTimeOutNotification = () => {
    setTimeout( ()=> this.setState({show: false}), 1)
  }
  handleShowNotification = (msg, type) => {
      this.setState({show: true, message: msg, type: type}, () => { this.setTimeOutNotification()})
  }
  componentDidMount = () => {
    this.getListLikeMe();
    this.getUser();
    this.getFriends();
    this.getAllImage();
   
  }
  render() {
    const { classes, user } = this.props;
    const { listLikeMe, listUser, listFriends, show, message, type, listImage } = this.state;
    
    return (
      <div className="nav-tab">
        <Nav tabs justified>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2')}}
            >
              All Image
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} style={{minHeight: '520px'}} >
          <TabPane tabId="1">
            <Row>
              <Col >
                <ListItem  listUser={listUser} handleShowNotification={this.handleShowNotification} user={user} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2" >
          <Row>
              <Col >
                <NewImage handleShowNotification={this.handleShowNotification} getAllImage={this.getAllImage} listImage={listImage} user={user} likeUser={this.likeUser} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <Notification show={show} message={message} type={type} />
      </div>
    );
  }
}
export default withStyles(styles)(TabHome);