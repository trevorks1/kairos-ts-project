import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core/styles';

// MATERIAL UI
import { Card, CardContent, CardActionArea } from '@material-ui/core';

const muiStyles = (theme) =>
  createStyles({
    card: {
      borderLeft: '5px solid #86F09B',
    },
    card1: {
      borderLeft: '5px solid #FFB577',
    },
    card2: {
      borderLeft: '5px solid #5F53AD',
    },
    card3: {
      borderLeft: '5px solid #F0E381',
    },
    card4: {
      borderLeft: '5px solid #AD2B9A',
    },
  });

const themeArray = ['card', 'card1', 'card2', 'card3', 'card4'];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

class CauseListItem extends Component {
  handleCauseClick = () => {
    this.props.history.push(`/browse/${this.props.cause.id}`);
  };

  render() {
    let storeNumber = randomNumber(0, themeArray.length - 1);
    const styleKey = themeArray[storeNumber];

    return (
      <Card className={this.props.classes[styleKey]}>
        <CardActionArea onClick={this.handleCauseClick}>
          <CardContent>
            <h4>{this.props.cause.cause}</h4>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withRouter(connect()(withStyles(muiStyles)(CauseListItem)));
