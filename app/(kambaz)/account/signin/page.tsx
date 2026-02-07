import Link from "next/link";
import { Col, FormControl } from "react-bootstrap";

export default function singin() {
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <Col sm={2}>
        <FormControl id="wd-username" placeholder="username" className="mb-2" />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
        />

        <Link
          id="wd-signin-btn"
          href="/account/profile"
          className="btn btn-primary w-100 mb-2"
        >
          Sign in{" "}
        </Link>
      </Col>
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}
