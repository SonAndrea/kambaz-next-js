import Link from "next/link";

export default function signup() {
  return (
    <div>
      <h3>Sign Up</h3>
      <input placeholder="username" className="wd-username" /> <br />
      <input placeholder="password" className="wd-password" /> <br />
      <input
        placeholder="verify password"
        type="password"
        className="wd-password-verify"
      />
      <br />
      <Link href="profile"> Sign up </Link>
      <br />
      <Link href="signin"> Sign in </Link>
    </div>
  );
}
