import Link from "next/link";
import "./_css/NavBar.scss";

const NavBar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/jokes">Jokes</Link>
      <Link href="/rq-jokes">RQ Jokes</Link>
    </nav>
  );
};
export default NavBar;
