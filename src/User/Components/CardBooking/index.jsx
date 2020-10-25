/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import "./styled/style.css";
import { FaChevronDown } from "react-icons/fa";


// import image
import flight from "../../Assets/flight.svg";
import { Link } from "react-router-dom";

export default class CardBooking extends Component {
  render() {
    return (
      <>
        <Card className='mt-4'>
          <CardBody className='p-0 d-flex flex-column'>
            <div className='content p-4'>
              <div className='h6'>{this.props.depDate} - {this.props.depTime}</div>
              <div className='d-flex align-items-center my-2'>
                <div className='h5 m-0 font-weight-bold'>{this.props.origin}</div>
                <div className='mx-3'>
                  <img src={flight} alt='flight' />
                </div>
                <div className='h5 m-0 font-weight-bold'>{this.props.dest}</div>
              </div>
              <div className='h6 m-0 text-muted'>{this.props.airlines}, {this.props.fCode}</div>
            </div>
            <div className='footer p-4'>
              <Row className='d-flex align-items-center'>
                <Col md={2}>
                  <div className='h6 m-0 text-muted font-weight-bold'>Status</div>
                </Col>
                <Col md={3}>
                  {this.props.status === 0 ?
                    <div className='status-waiting text-center py-1 small font-weight-bold'>
                      Waiting for payment
                    </div> :
                    <div className='status-success text-center py-1 small font-weight-bold'>
                      Eticket Issued
                    </div> 
                  }
                </Col>
                <Col md={7}>
                  <div className='text-right font-weight-bold' style={{color: "#2395FF"}}>
                    <Link to={this.props.status===0? "/payment":`/booking/detail/${this.props.id}`} className='text-decoration-none'>
                    View Details <FaChevronDown />
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}
