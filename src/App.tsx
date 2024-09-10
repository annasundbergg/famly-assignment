import { useEffect, useState } from "react";
import { Child } from "./types/child";
import ListChildren from "./ListChildren/ListChildren";
import Pagination from "./Pagination/Pagination";

function App() {
  const [children, setChildren] = useState<Child[]>([]);
  const [isCheckingIn, setIsCheckingIn] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const fetchChildren = () => {
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
    const groupId = "86413ecf-01a1-44da-ba73-1aeda212a196";
    const institutionId = "dc4bd858-9e9c-4df7-9386-0d91e42280eb";

    const url = `https://app.famly.co/api/daycare/tablet/group?accessToken=${accessToken}&groupId=${groupId}&institutionId=${institutionId}`;

    fetch(url, {
      method: "GET",
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
        console.log(data.children);
        setChildren(data.children);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const checkingIn = () => {
    setIsCheckingIn(true);
  };

  const checkingOut = () => {
    setIsCheckingIn(false);
  };

  const goBackToStart = () => {
    setIsCheckingIn(null);
  };

  const filteredChildren = isCheckingIn
    ? children.filter((child) => !child.checkedIn)
    : children.filter((child) => child.checkedIn);

  if (isCheckingIn === null) {
    return (
      <div className="App">
        <h1>Hello!</h1>
        <h3>Are you checking in or out?</h3>
        <button onClick={checkingIn}>Checking In</button>
        <button onClick={checkingOut}>Checking Out</button>
      </div>
    );
  }

  const currentPosts = filteredChildren.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="App">
      <ListChildren
        children={currentPosts}
        isCheckingIn={isCheckingIn}
        goBack={goBackToStart}
        fetchChildren={fetchChildren}
      />

      <Pagination
        totalPosts={filteredChildren.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
