import Link from "next/link";
import "./_css/NavBar.scss";

const links = [
  { href: "/", link: "Home" },
  { href: "/joke", link: "Joke" },
  { href: "/rq-jokes", link: "RQ-Jokes" },
  { href: "/jokes-refetch", link: "Jokes-Refetch" },
  { href: "/user-list", link: "User List" },
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
