import { useParams } from "react-router-dom";

import Loader from "@components/Loader/Loader";

import { useUserById } from "../hooks/useUserById";

const UserProfile = () => {
  const { userId } = useParams();

  const { data, isLoading, error } = useUserById(userId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      {/* <div className={styles.profileContainer}></div> */}
    </div>
  );
};

export default UserProfile;
