import Class from "./UserProfile.module.css";
import {PiPencilFill} from "react-icons/pi";
import {useState} from "react";
import {BiDotsVerticalRounded} from "react-icons/bi";
import AccountModal from "../user/AccountModal";
import ProfileSummary from "./ProfileSummary";
import UserPosts from "./UserPosts";
import Cookies from "js-cookie";

function UserProfile() {
  const [nameIsActive, setNameIsActive] = useState();
  const [usernameIsActive, setUsernameIsActive] = useState();
  const [accountModalIsActive, setAccountModalIsActive] = useState();
  const [name, setName] = useState(Cookies.get("name"));
  const [username, setUsername] = useState(Cookies.get("username"));

  // when user hovers over name/username display edit button
  const displayEditButtonHandler = (e) => {
    if (e.target.closest("#name")) {
      setNameIsActive(true);
    } else if (e.target.closest("#username")) {
      setUsernameIsActive(true);
    }
  };

  // when user stops hovering over name/username hide edit button
  const hideEditButtonHandler = (e) => {
    if (e.target.closest("#name")) {
      setNameIsActive(false);
    } else if (e.target.closest("#username")) {
      setUsernameIsActive(false);
    }
  };

  const accountClickHandler = () => {
    setAccountModalIsActive(!accountModalIsActive);
  };

  return (
    <>
      <section className={Class.container}>
        <article className={Class.profile}>
          <img src="/default-profile-picture1.jpg" alt="" />
          <div className={Class.nameGroup}>
            <div
              className={Class.nameContainer}
              onMouseOver={displayEditButtonHandler}
              onMouseOut={hideEditButtonHandler}
              id="name"
            >
              <h4>{name}</h4>
              {nameIsActive && <PiPencilFill className={Class.editBtn} />}
            </div>
            <div className={Class.divider}></div>
            <div
              className={Class.nameContainer}
              onMouseOver={displayEditButtonHandler}
              onMouseOut={hideEditButtonHandler}
              id="username"
            >
              <span>@{username}</span>
              {usernameIsActive && <PiPencilFill className={Class.editBtn} />}
            </div>
          </div>
          <BiDotsVerticalRounded className={Class.accountEdit} onClick={accountClickHandler} />
          {accountModalIsActive && (
            <AccountModal closeModal={accountClickHandler} setName={setName} setUsername={setUsername} />
          )}
          <ProfileSummary />
        </article>
      </section>
      <UserPosts />
    </>
  );
}

export default UserProfile;
