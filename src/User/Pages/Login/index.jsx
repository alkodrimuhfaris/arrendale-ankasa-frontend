import React from "react";
import "./style/style.css";
import {
  Alert,
  Button,
  Col, Form, Input, Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Import image
import logo from "../../Assets/logo-sm.svg";
import googleImg from "../../Assets/google.svg";
import facebookImg from "../../Assets/facebook.svg";

// Import Component
import AuthSideBar from "../../Components/AuthSideBar";

import authAction from "../../Redux/actions/auth";
import profileAction from "../../Redux/actions/profile";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: false,
      password: false,
    };
  }

  onChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    const data = {
      email,
      password
    }
    this.props.login(data)
  }

  componentDidUpdate() {
    const { token } = this.props.auth
    localStorage.setItem('token', token)
    if (this.props.auth.isLogin) {
      this.props.getData(token) &&
      this.props.history.push(
        this.props.location.state === undefined
        ?'/'
        :this.props.location.state.location
      )
    }
  }

  render(){
    const {isError, alertMsg} = this.props.auth
    return (
      <React.Fragment>
        <Row className="vh-100 vw-100">
          <AuthSideBar />
          <Col md={5} className="vh-100 w-100 px-5 py-3">
            <div className="head-signup d-flex align-items-center">
              <Link to='/'>
                <img className="logo mr-3" src={logo} alt="logo"/>
              </Link>
              <div>
                <span className="h4 font-weight-bold">Ankasa</span>
              </div>
            </div>
            <div className="body-signup d-flex flex-column justify-content-center">
              <div>
                <Alert 
                className='text-center' 
                color={isError?'danger':'success'} 
                isOpen={isError || alertMsg!==''}>{alertMsg}</Alert>
              </div>
              <Form onSubmit={this.login}>
                <div className="mb-3">
                  <span className="h2 font-weight-bold">Login</span>
                </div>
                <Input onChange={this.onChangeText} name='email' type="email" className="border-bottom mb-3" placeholder="Email" />
                <Input onChange={this.onChangeText} name='password' type="password" className="border-bottom mb-3" placeholder="Password" />
                <Button type='submit' color="primary" className="shadow mb-3 font-weight-bold" block>Sign In</Button>
                <div className="text-center">
                  <div>
                    <span>Did you forget your password?</span>
                  </div>
                  <div>
                    <Link to="/forgot-password">
                      <span>Tap here for reset</span>
                    </Link>
                  </div>
                </div>
              </Form>
              <div>
                <hr/>
                <div className="text-center mb-3">
                  <span>or sign in with</span>
                </div>
                <div className="d-flex justify-content-center">
                  <Button href="https://accounts.google.com/Login?hl=in" color="outline-primary" className="btn-img font-weight-bold mr-3">
                    <img src={googleImg} alt="google" />
                  </Button>
                  <Button href="https://id-id.facebook.com/login" color="outline-primary" className="btn-img font-weight-bold">
                    <img src={facebookImg} alt="facebook"/>
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  login: authAction.login,
  getData: profileAction.getProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);