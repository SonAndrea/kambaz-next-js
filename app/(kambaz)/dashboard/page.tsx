import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4">
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href="/courses/cs4550"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/cs4550.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      CS4550 Web Development
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      Web Development
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href="/courses/comm1112"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/comm1112.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      COMM1112 Public Speaking
                    </CardTitle>
                    <CardText style={{ height: "100px" }}>
                      Public Speaking
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href="/courses/cs4530"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/cs4530.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      CS4530 Software Engineering
                    </CardTitle>
                    <CardText style={{ height: "100px" }}>
                      Fundamentals of Software Engineering
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href="/courses/cs4400"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/cs4400.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      CS4400 Programming Languages
                    </CardTitle>
                    <CardText style={{ height: "100px" }}>
                      Programming Languages
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href="/courses/ge1501"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/ge1501.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      GE1501 Cornerstone
                    </CardTitle>
                    <CardText style={{ height: "100px" }}>
                      Cornerstone of Engineering
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href="/courses/clubsports"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/clubsports.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      Club Sports
                    </CardTitle>
                    <CardText style={{ height: "100px" }}>
                      N.U. Club Sports 25–26
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href="/courses/expmakerspace"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/expmakerspace.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      EXP Makerspace
                    </CardTitle>
                    <CardText style={{ height: "100px" }}>
                      EXP Makerspace: Users
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href="/courses/khouryservices"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src="/images/khouryservices.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      Khoury Services
                    </CardTitle>
                    <CardText style={{ height: "100px" }}>
                      Khoury Student Services
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
