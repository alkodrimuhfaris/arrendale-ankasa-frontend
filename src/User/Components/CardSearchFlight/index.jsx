import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

import leftIcon from "../../Assets/left.svg";
import switchIcon from "../../Assets/blue-horizontal-switch.svg";
import whiteFlightIcon from "../../Assets/white-flight.svg";
import blackFlightIcon from "../../Assets/flight.svg";
import roundedTripIcon from "../../Assets/rounde-trip.svg";

const CardSearchFlight = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrigin, setIsOrigin] = useState(false);
  const [displayChoice, setDisplayChoice] = useState(false);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);
  const choice = () => setDisplayChoice(!displayChoice);
  const onClickSearch = () => {
    history.push("/search/result");
  };

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
              <LinkRecently to="/search/result">Recently Searched</LinkRecently>
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
                        <Heading4>Medan</Heading4>
                      </ChoiceButton>
                    </Col>
                    <Col lg={12}>
                      <Heading6>Indonesia</Heading6>
                    </Col>
                  </Row>
                </Col>
                <Col xs={2}>
                  <SwitchButton>
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
                        <Heading4>Tokyo</Heading4>
                      </ChoiceButton>
                    </Col>
                    <Col lg={12}>
                      <Heading6>Japan</Heading6>
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
                value="2014-02-09"
                placeholder="date placeholder"
              />
            </FormGroup>
            <Row form>
              <Col xs={12}>
                <LabelInput>How many person?</LabelInput>
              </Col>
              <Col>
                <FormGroup>
                  <InputUser type="select" name="child" id="child">
                    <option>0 Child</option>
                    <option>1 Child</option>
                    <option>2 Child</option>
                    <option>3 Child</option>
                    <option>4 Child</option>
                  </InputUser>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <InputUser type="select" name="adult" id="adult">
                    <option>1 Adult</option>
                    <option>2 Adult</option>
                    <option>3 Adult</option>
                    <option>4 Adult</option>
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
                    <InputUser type="radio" name="class" />
                    Economy
                  </LabelInput>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <LabelInput check>
                    <InputUser type="radio" name="class" />
                    Business
                  </LabelInput>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <LabelInput check>
                    <InputUser type="radio" name="class" />
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
