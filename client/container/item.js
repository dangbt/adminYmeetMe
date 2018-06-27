import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Message } from '@material-ui/icons'
import Notification from '../components/Notification/index.jsx';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  display: {
      display: 'flex'
  }
};

function SimpleMediaCard(props) {
  const { classes, friend, joinRoom, show, message, type } = props;
  return (
    <div className={classes.display} >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={friend.avatar ? friend.avatar : '../../assets/default-avatar.png' }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {friend.info.fullName}
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => joinRoom(friend._id)} >
            <Message/>
          </Button>
        </CardActions>
      </Card>
      <Notification show={show} message={message} type={type}/>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);