import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class Notification extends Component {
    createNotification = (message, type, time) => {
        if(!message) message = '';
        
        if (type == 'info' || type == null) {
            return NotificationManager.info(message,'', time ? time : 3000);
        }
        if (type == 'success') {
            return NotificationManager.success(message,'', time ? time : 3000);
        }
        if (type == 'warning') {
            return NotificationManager.warning(message,'', time ? time : 3000);
        }
        if (type == 'error') {
            return NotificationManager.error(message,'', time ? time : 3000);
        }
    }
    render() {
        const { show, message, type, time } = this.props;
        return (
            <div>
                {show ? this.createNotification(message, type, time) : <div></div>}
                <NotificationContainer />
            </div>
        )
    }
}