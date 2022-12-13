import React from "react";
import Tuits from "../tuits";
import {Link} from "react-router-dom";

const Profile = () => {
  const location = useLocation()
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
    }, []);
    const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
    }
    return(
      <div>
        <h4>{profile.username}</h4>
        <h6>@{profile.username}</h6>
        <button onClick={logout}>
          Logout</button>
      </div>
    );
  };
  
export default Profile;