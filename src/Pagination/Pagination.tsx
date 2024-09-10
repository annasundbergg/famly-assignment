import "./pagination.css";

type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {totalPosts === 0 ? (
        ""
      ) : (
        <>
          <p>Page:</p>

          {pages.map((page, index) => {
            return (
              <p
                key={index}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </p>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Pagination;
