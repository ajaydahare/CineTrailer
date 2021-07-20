import React, { useEffect } from "react";
import "./Profile.css";
import UserIcon from "../images/nfuser.jpg";
import { useDispatch, useSelector } from "react-redux";
import { cancelPack, getPacks } from "../actions/packs";
import SubscriptionPack from "./SubscriptionPack";

export default function Profile({ user, setUser }) {
  const dispatch = useDispatch();

  const { packsData, activePack, expireIn } = useSelector(
    (state) => state.packs
  );

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.reload();
    setUser(null);
  };
  useEffect(() => {
    dispatch(getPacks());
  }, []);

  const cancelSubs = (userId) => {
    dispatch(cancelPack(userId));
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <img src={user?.photoURL || UserIcon} alt="" />
        <h1 className="user__name">
          hi, {user?.result?.name || user?.result?.email}
        </h1>

        <button onClick={logout} className="logout__butoon">
          Sign Out
        </button>
      </div>
      <h2>
        {activePack
          ? "Manage your subscription"
          : "Subscribe Now to Start Watching"}
      </h2>

      <div className="subscription__packs">
        {packsData.map((pack) => {
          return (
            <SubscriptionPack
              key={pack._id}
              pack={pack}
              user={user}
              activePack={activePack}
            />
          );
        })}
      </div>
      {activePack && (
        <div className="pack__deatils">
          <p>
            Your Subscription expire on{" "}
            <span className="pack__expire">
              {new Date(expireIn).toDateString()}
            </span>
            . Cancel Anytime
          </p>
          <button
            className="cancel__sub"
            onClick={() => cancelSubs(user?.result?.id)}
          >
            Cancel Subscription
          </button>
        </div>
      )}
    </div>
  );
}
