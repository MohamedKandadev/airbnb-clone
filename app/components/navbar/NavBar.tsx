import { User } from "@prisma/client";
import Container from "../ui/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

interface navbarProps {
  currentUser?: User | null
}

const NavBar: React.FC<navbarProps> = ({
  currentUser
}) => {
  return ( 
    <div className="fixed z-10 w-full shadow-sm bg-white">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row justify-between items-center gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}

export default NavBar;