import MyTuits from "./my-tuits";
import TuitsAndReplies
  from "./tuits-and-replies";
import Media from "./media";
import MyLikes from "./my-likes";

const Profile = () => {
  return(
    <div>
      <h4>{profile.username}</h4>
      <h6>@{profile.username}</h6>
      <button onClick={logout}>
        Logout</button>

      <Routes>
        <Route path="/mytuits"
               element={<MyTuits/>}/>
        <Route path="/tuits-and-replies"
               element={<TuitsAndReplies/>}/>
        <Route path="/media"
               element={<Media/>}/>
        <Route path="/mylikes"
               element={<MyLikes/>}/>
      </Routes>

    </div>
  );
};
export default Profile;