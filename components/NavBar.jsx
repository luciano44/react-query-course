import Link from "next/link";
import "./_css/NavBar.scss";

const links = [
  { href: "/", link: "Home" },
  { href: "/joke", link: "Joke" },
  { href: "/rq-jokes", link: "RQ-Jokes" },
  { href: "/jokes-refetch", link: "Jokes-Refetch" },
  { href: "/user-list", link: "User List" },
  { href: "/parallel-queries", link: "Parallel Queries" },
  { href: "/dependent-queries", link: "Dependent Queries" },
];

const NavBar = () => {
  return (
    <nav>
      {links.map((l) => (
        <Link key={l.href} href={l.href}>
          {l.link}
        </Link>
      ))}
    </nav>
  );
};
export default NavBar;
