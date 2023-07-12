import Class from "./CommunityPage.module.css";
import Post from "../components/community/Post";
import Menu from "../components/community/Menu";

function CommunityPage() {
  const user = {
    name: "Zachary",
    username: "@user112233",
    img: "../../public/default-profile-picture1.jpg",
    body: "Lorem ipsum and all that ya getit. We do sdmsdk mfs lkdmfsl dkm flsd mflks mdflkm sd dfksdf",
  };
  const user2 = {
    name: "Casares",
    username: "@user5507833",
    img: "../../public/default-profile-picture1.jpg",
    body: " Bada Bing Bada Bang Bada Boom. YA DIGG",
  };
  return (
    <div className={Class.page}>
      <div className={Class.feed}>
        <h1>Feed</h1>
        <Post user={user} />
        <Post user={user2} />
        <Post user={user} />
        <Post user={user2} />
        <Post user={user} />
      </div>
      <div className={Class.menu}>
        <Menu />
      </div>
    </div>
  );
}

export default CommunityPage;
