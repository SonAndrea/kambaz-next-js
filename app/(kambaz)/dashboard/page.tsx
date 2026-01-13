import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/cs4550" className="wd-dashboard-course-link">
            <Image
              src="/images/cs4550.jpg"
              width={200}
              height={150}
              alt="cs4550"
            />
            <div>
              <h5> CS4550 </h5>
              <p className="wd-dashboard-course-title">Web Development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/comm1112" className="wd-dashboard-course-link">
            <Image
              src="/images/comm1112.jpg"
              width={200}
              height={150}
              alt="comm1112"
            />
            <div>
              <h5> COMM1112 </h5>
              <p className="wd-dashboard-course-title">Public Speaking</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/cs4530" className="wd-dashboard-course-link">
            <Image
              src="/images/cs4530.jpg"
              width={200}
              height={150}
              alt="cs4530"
            />
            <div>
              <h5> CS4530 </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Software Engineering
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/cs4400" className="wd-dashboard-course-link">
            <Image
              src="/images/cs4400.jpg"
              width={200}
              height={150}
              alt="cs4400"
            />
            <div>
              <h5> CS4400 </h5>
              <p className="wd-dashboard-course-title">Programming Languages</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/ge1501" className="wd-dashboard-course-link">
            <Image
              src="/images/ge1501.jpg"
              width={200}
              height={150}
              alt="ge1501"
            />
            <div>
              <h5> GE1501 </h5>
              <p className="wd-dashboard-course-title">
                Cornerstone of Engineering
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/clubsports" className="wd-dashboard-course-link">
            <Image
              src="/images/clubsports.jpg"
              width={200}
              height={150}
              alt="clubsports"
            />
            <div>
              <h5> Club Sports </h5>
              <p className="wd-dashboard-course-title">
                N.U. Club Sports 25-26
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link
            href="/courses/expmakerspace"
            className="wd-dashboard-course-link"
          >
            <Image
              src="/images/expmakerspace.jpg"
              width={200}
              height={150}
              alt="expmakerspace"
            />
            <div>
              <h5> EXP Makerspace </h5>
              <p className="wd-dashboard-course-title">EXP Makerspace: Users</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link
            href="/courses/khouryservices"
            className="wd-dashboard-course-link"
          >
            <Image
              src="/images/khouryservices.jpg"
              width={200}
              height={150}
              alt="khouryservices"
            />
            <div>
              <h5> Khoury Services </h5>
              <p className="wd-dashboard-course-title">
                Khoury Student Services
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
