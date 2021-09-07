/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import '../components/Ink.css';

const InkSkeleton = (props) => {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className="card" key={index}>
      <CardMedia className="cover" image={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
      <CardContent className="cardContent">
        <div className="handle" />
        <div className="date" />
        <div className="fullLine" />
        <div className="fullLine" />
        <div className="halfLine" />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};



export default InkSkeleton;