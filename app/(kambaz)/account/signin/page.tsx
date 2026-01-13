import Link from "next/link";

export default function singin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign In</h3>
      <input placeholder="username" className="wd-username" /> <br />
      <input
        placeholder="password"
        type="password"
        className="wd-password"
      />{" "}
      <br />
      <Link href="/dashboard" id="wd-signin-btn">
        Sign in
      </Link>{" "}
      <br />
      <Link href="signup" id="wd-signup-btn">
        Sign up
      </Link>
    </div>
  );
}
