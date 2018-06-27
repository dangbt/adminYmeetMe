import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';
import TabHome from './TabHome.jsx';
import Slide from '../SlideAdvertisement/Slide.jsx';
import './Home.scss';
import checkAuthenticate from '../Function/checkAuthenticate';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      authenticate: true,
      user: {},
      blocking: true,
    }
  }

  checkAuth = () => {
    checkAuthenticate().then((response) => {
      this.setState({
        authenticate: response.authentication,
        user: response.data
      })
      

    })
  }
  componentDidMount() {
    this.checkAuth();
    setTimeout(() => this.setState({blocking: false}), 3000)
  }
  render(){
    const { authenticate, user, blocking} = this.state;
    // if (!authenticate) {
    //   return (
    //     <Redirect to={'/login'}></Redirect>
    //   )
    // }
    return (
      <div className='home-page'>
        <Sidebar  user={user} >
            <BlockUi tag="div" blocking={blocking} message="Please wait" keepInView>
              <TabHome user={user} />
            </BlockUi>
        </Sidebar>
      </div>  
    )
  }
}
