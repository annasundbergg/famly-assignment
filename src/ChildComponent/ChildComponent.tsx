import { useState } from "react";
import { type Child } from "../types/child";
import { formatPickupTime } from "../utils/formatTime";

type Props = {
  child: Child;
  isCheckingIn: boolean;
  fetchChildren: () => void;
};

const ChildComponent = ({ child, isCheckingIn, fetchChildren }: Props) => {
  const [pickupTime, setPickupTime] = useState<string>("");
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const url = `https://app.famly.co/api/v2/children/${child.childId}`;

  const handleCheckIn = () => {
    if (!pickupTime) {
      alert("Please select a pick-up time before checking in.");
      return;
    }

    fetch(
      `${url}/checkins?accessToken=${accessToken}&pickupTime=${pickupTime}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        fetchChildren();
        alert("Check in successful");
        setPickupTime("");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleCheckOut = () => {
    const confirmCheckOut = window.confirm(
      "Are you sure you want to check out?"
    );

    if (!confirmCheckOut) {
      return;
    }

    fetch(`${url}/checkout?accessToken=${accessToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        fetchChildren();
        alert("Check out successful");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <li key={child.childId}>
      <img src={child.image.small} alt={`image of ${child.name.fullName}`} />
      <span className="name-span">{child.name.fullName}</span>

      {isCheckingIn ? (
        <>
          <label>
            <p className="pickup-time">Pick-up Time:</p>

            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
            />
          </label>
          <button className="checkin-btn" onClick={() => handleCheckIn()}>
            Check In
          </button>
        </>
      ) : (
        <>
          <span>
            Checked In ✅ Pick-Up Time: {formatPickupTime(child.pickupTime)}
          </span>

          <button className="checkout-btn" onClick={() => handleCheckOut()}>
            Check Out
          </button>
        </>
      )}
    </li>
  );
};

export default ChildComponent;
