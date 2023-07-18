import Class from "./Menu.module.css";
import {VscSearch} from "react-icons/vsc";
import {useEffect, useState} from "react";
import CommunityItem from "./CommunityItem";
import Cookies from "js-cookie";
import {PiListPlusLight} from "react-icons/pi";
import MenuForm from "./MenuForm";

function Menu({setGroupPageIsActive, joinedCommunities, isLoading, setActiveCommunityId}) {
  const [formIsActive, setFormIsActive] = useState(false);

  const communityClickHandler = (id) => {
    setGroupPageIsActive(true);
    setActiveCommunityId(id);
  };
  const addCommunityClickHandler = () => {
    setFormIsActive(!formIsActive);
  };

  return (
    <aside className={Class.container}>
      <header>
        <img src="../../public/default-profile-picture1.jpg" />
        <div className={Class.nameGroup}>
          {Cookies.get("name") && <span>{Cookies.get("name")}</span>}
          <sub>@{Cookies.get("username")}</sub>
        </div>
      </header>
      <section>
        <h3>Joined Communities </h3>
        <div className={Class.communityList}>
          {!isLoading &&
            joinedCommunities.map((community) => {
              return (
                <CommunityItem
                  communityClickHandler={communityClickHandler}
                  name={community.name}
                  key={community._id}
                  id={community._id}
                />
              );
            })}
        </div>
      </section>
      <section>
        <h3>Official Communities</h3>
      </section>
    </aside>
  );
}

export default Menu;
