import { Child } from "../types/child";
import ChildComponent from "../ChildComponent/ChildComponent";

type ListChildrenProps = {
  children: Child[];
  isCheckingIn: boolean;
  goBack: () => void;
  fetchChildren: () => void;
};

const ListChildren = ({
  children,
  isCheckingIn,
  goBack,
  fetchChildren,
}: ListChildrenProps) => {
  return (
    <div>
      <button className="back-btn" onClick={goBack}>
        Back to Start
      </button>
      {isCheckingIn ? (
        <p>
          Before checking in, please insert what time you aim to come pick up
          your child today
        </p>
      ) : (
        ""
      )}
      {children.length === 0 ? (
        <p>No children to display</p>
      ) : (
        <ul>
          {children.map((child, index) => (
            <ChildComponent
              key={index}
              child={child}
              isCheckingIn={isCheckingIn}
              fetchChildren={fetchChildren}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListChildren;
