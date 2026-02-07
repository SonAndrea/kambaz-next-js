import Link from "next/link";
import { Col, FormControl, FormSelect } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Col sm={2}>
        <FormControl
          id="wd-username"
          placeholder="username"
          className="mb-2"
          defaultValue="son.and"
        />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
          defaultValue="hello!"
        />
        <FormControl
          id="wd-first-name"
          placeholder="first name"
          className="mb-2"
          defaultValue="Andrea"
        />
        <FormControl
          id="wd-last-name"
          placeholder="last name"
          className="mb-2"
          defaultValue="Son"
        />

        <FormControl
          type="date"
          id="wd-email"
          placeholder="email"
          className="mb-2"
          defaultValue="07-22-2005"
        />

        <FormControl
          id="wd-email"
          placeholder="email"
          className="mb-2"
          defaultValue="son.and@northeastern.edu"
        />
        <FormSelect>
          <option value="faculty" defaultChecked>
            Faculty
          </option>
          <option value="user">User</option>
          <option value="student">Student</option>
          <option value="student">Admin</option>
        </FormSelect>
        <br />

        <Link
          id="wd-signin-btn"
          href="/account/signin"
          className="btn btn-danger w-100 mb-2"
        >
          Sign Out{" "}
        </Link>
      </Col>
    </div>
  );
}
