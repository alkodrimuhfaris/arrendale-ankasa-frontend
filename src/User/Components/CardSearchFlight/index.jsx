import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DateObject from "react-date-object";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import {
  Card,
  SubCard,
  TextBlack,
  LinkRecently,
  Heading6,
  Heading4,
  SwitchButton,
  ChoiceButton,
  GrupButton,
  LabelInput,
  InputUser,
  SearchButton
} from "./styled";

import ChoicePlace from "./ChoicePlace";

import dateFormat from "../../Helper/dateFormat";

import leftIcon from "../../Assets/left.svg";
import switchIcon from "../../Assets/blue-horizontal-switch.svg";
import whiteFlightIcon from "../../Assets/white-flight.svg";
import blackFlightIcon from "../../Assets/flight.svg";
import roundedTripIcon from "../../Assets/rounde-trip.svg";

import searchActions from "../../Redux/actions/search";

const CardSearchFlight = () => {
  const dateNow = new DateObject(Date.now()).format("YYYY");
  const [isOpen, setIsOpen] = useState(false);
  const [isOrigin, setIsOrigin] = useState(false);
  const [isSwitch, setIsSwitch] = useState(false);
  const [className, setClassName] = useState("Economy");
  const [dateFlight, setDateFlight] = useState("");
  const [child, setChild] = useState(0);
  const [adult, setAdult] = useState(0);
  const [displayChoice, setDisplayChoice] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setDateFlight(dateNow);
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const choice = () => setDisplayChoice(!displayChoice);

  const onClickSearch = () => {
    const originId = localStorage.getItem("originCityId");
    const destinationId = localStorage.getItem("destinationCityId");
    if(!isSwitch){
      dispatch(searchActions.findTicket(originId, destinationId, className, dateFlight));
    }else{
      dispatch(searchActions.findTicket(destinationId, originId, className, dateFlight));
    }
    localStorage.setItem("flightClassName", className);
    localStorage.setItem("flightDate", dateFlight);
    localStorage.setItem("flightDateFormat", dateFormat(dateFlight));
    let passanger = child+adult;
    localStorage.setItem("passenger", passanger);
    history.push("/search/result");
  };

  const onSelectedClass = async (e) => {
    await setClassName(e.target.value);
  };

  const onchangeDate = (e) => {
    setDateFlight(e.target.value);
  };

  const onChangeChild = (e) => {
    setChild(parseInt(e.target.value));
  };

  const onChangeAdult = (e) => {
    setAdult(parseInt(e.target.value));
  };

  const onSwitchPlace = () => setIsSwitch(!isSwitch);

  const onClickOrigin = () => {
    setIsOrigin(true);
    setDisplayChoice(!displayChoice);
  };

  const onClickDestination = () => {
    setIsOrigin(false);
    setDisplayChoice(!displayChoice);
  };

  return (
    <>
      <ChoicePlace
        choiceDisplay={displayChoice}
        choice={choice}
        isOrigin={isOrigin}
      />
      <Card choiceDisplay={displayChoice}>
        <Container>
          <TextBlack>
            Hey,
            <br />
            Where you want to go?
          </TextBlack>
          <Row className="mb-4 justify-content-between">
            <Col xs="auto">
              <LinkRecently to="/search/result" onClick={onClickSearch}>
                Recently Searched
              </LinkRecently>
            </Col>
            <Col xs="auto">
              <img src={leftIcon} alt="" />
            </Col>
          </Row>
          <SubCard className="pt-2 pb-2 mb-4">
            <Container>
              <Row className="align-items-center justify-content-between">
                <Col xs={5}>
                  <Row>
                    <Col lg={12}>
                      <Heading6>From</Heading6>
                    </Col>
                    <Col lg={12}>
                      <ChoiceButton onClick={onClickOrigin} className="p-0 m-0">
                        <Heading4>
                          {!isSwitch && localStorage.getItem("originCityName")}
                          {isSwitch &&
                            localStorage.getItem("destinationCityName")}
                        </Heading4>
                      </ChoiceButton>
                    </Col>
                    <Col lg={12}>
                      <Heading6>
                        {!isSwitch && localStorage.getItem("originCountryName")}
                        {isSwitch &&
                          localStorage.getItem("destinationCountryName")}
                      </Heading6>
                    </Col>
                  </Row>
                </Col>
                <Col xs={2}>
                  <SwitchButton onClick={onSwitchPlace}>
                    <img src={switchIcon} alt="" />
                  </SwitchButton>
                </Col>
                <Col xs={5}>
                  <Row className="text-right">
                    <Col lg={12}>
                      <Heading6>To</Heading6>
                    </Col>

                    <Col lg={12}>
                      <ChoiceButton
                        onClick={onClickDestination}
                        className="p-0 m-0"
                      >
                        <Heading4>
                          {!isSwitch &&
                            localStorage.getItem("destinationCityName")}
                          {isSwitch && localStorage.getItem("originCityName")}
                        </Heading4>
                      </ChoiceButton>
                    </Col>
                    <Col lg={12}>
                      <Heading6>
                        {!isSwitch &&
                          localStorage.getItem("destinationCountryName")}
                        {isSwitch && localStorage.getItem("originCountryName")}
                      </Heading6>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </SubCard>
          <Row xs={2} className="mb-4">
            <Col>
              <GrupButton
                className="btn-block"
                onClick={toggle}
                isOpen={!isOpen}
              >
                <img src={isOpen ? blackFlightIcon : whiteFlightIcon} alt="" />
                &nbsp;&nbsp; One way
              </GrupButton>
            </Col>
            <Col>
              <GrupButton
                className="btn-block"
                onClick={toggle}
                isOpen={isOpen}
              >
                <img src={roundedTripIcon} alt="" />
                &nbsp;&nbsp; Round trip
              </GrupButton>
            </Col>
          </Row>
          <Form className="mb-4">
            <FormGroup>
              <LabelInput>Departure</LabelInput>
              <InputUser
                type="date"
                name="departure"
                id="departure"
                onChange={onchangeDate}
                value={dateFlight}
                placeholder="date placeholder"
              />
            </FormGroup>
            <Row form>
              <Col xs={12}>
                <LabelInput>How many person?</LabelInput>
              </Col>
              <Col>
                <FormGroup>
                  <InputUser type="select" name="child" id="child" onChange={onChangeChild}>
                    <option value="0">0 Child</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Child</option>
                    <option value="3">3 Child</option>
                    <option value="4">4 Child</option>
                  </InputUser>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <InputUser type="select" name="adult" id="adult" onChange={onChangeAdult}>
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adult</option>
                    <option value="3">3 Adult</option>
                    <option value="4">4 Adult</option>
                  </InputUser>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <LabelInput>Which class do you want?</LabelInput>
              </Col>
              <Col>
                <FormGroup check>
                  <LabelInput check>
                    <InputUser type="radio" name="class" value="Economy" onClick={onSelectedClass}/>
                    Economy
                  </LabelInput>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <LabelInput check>
                    <InputUser type="radio" name="class" value="Business" onClick={onSelectedClass}/>
                    Business
                  </LabelInput>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <LabelInput check>
                    <InputUser type="radio" name="class" value="FirstClass" onClick={onSelectedClass}/>
                    First Class
                  </LabelInput>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <SearchButton className="btn-block" onClick={onClickSearch}>
            SEARCH FLIGHT
          </SearchButton>
        </Container>
      </Card>
    </>
  );
};

export default CardSearchFlight;
