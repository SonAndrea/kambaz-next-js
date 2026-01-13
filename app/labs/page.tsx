import Link from "next/link";
export default function labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <h2>Andrea Son - Section 02</h2>
      <Link
        href="https://github.com/SonAndrea/kambaz-next-js"
        id="wd-repo-link"
      >
        Link to this Github Repo
      </Link>
      <Link
        href="https://kambaz-next-js-weld-xi.vercel.app/account/signin"
        id="wd-repo-link"
      >
        Link to the Kambaz Application
      </Link>
      <ul>
        <li>
          <Link href="/labs/lab1" id="wd-lab1-link">
            Lab 1: HTML Examples{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab2" id="wd-lab2-link">
            Lab 2: CSS Basics{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals{" "}
          </Link>
        </li>
        <li>
          <Link href="/">Kambaz </Link>
        </li>
      </ul>
    </div>
  );
}
