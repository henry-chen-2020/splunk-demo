import React, { useState } from "react";

const PAGE_SIZE = 5;
const sortList = (
  list,
  { sort, ord = 1 },
  pageNum = 1,
  pageSize = PAGE_SIZE
) => {
  const start = (pageNum - 1) * pageSize;
  return list
    .sort((a, b) => (a[sort] > b[sort] ? 1 : -1) * ord)
    .slice(start, start + pageSize);
};
const SplunkRepos = (props) => {
  const [pageNum, setPageNum] = useState(1);
  const [sortOrder, setSortOrder] = useState({ sort: "name", ord: 1 });
  const list = props.data;
  const totalPage = Math.ceil(list.length / PAGE_SIZE);
  const setPage = (evt) => {
    setPageNum(parseInt(evt.target.value, 10));
  };
  const setSort = (evt) => {
    const newSort = evt.target.getAttribute("data");
    if (newSort === sortOrder.sort) {
      setSortOrder(({ sort, ord }) => ({ sort, ord: ord * -1 }));
    } else {
      setSortOrder(() => ({ sort: newSort, ord: -1 }));
      setPageNum(1);
    }
  };
  return (
    <div>
      <div className="title">
        <h1>
          Splunk <span className="plus">+</span> GitHub
        </h1>
        <span className="buttons">
          <button
            className="dir"
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
          >
            Previous
          </button>
          &nbsp;
          <button className="num" value="1" onClick={setPage}>
            1
          </button>
          &nbsp;
          <button className="num" value="2" onClick={setPage}>
            2
          </button>
          &nbsp;
          <button className="num" value="3" onClick={setPage}>
            3
          </button>
          &nbsp; &nbsp;...&nbsp;&nbsp;
          <button className="num" value={totalPage} onClick={setPage}>
            {totalPage}
          </button>
          &nbsp;
          <button
            className="dir"
            disabled={pageNum === totalPage}
            onClick={() => setPageNum(pageNum + 1)}
          >
            Next
          </button>
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th className="name" data="name" onClick={setSort}>
              Name &nbsp;{" "}
              {sortOrder.sort === "name"
                ? sortOrder.ord === 1
                  ? "^"
                  : "v"
                : ""}
            </th>
            <th className="number" data="author" onClick={setSort}>
              Last Commiter &nbsp;{" "}
              {sortOrder.sort === "author"
                ? sortOrder.ord === 1
                  ? "^"
                  : "v"
                : ""}
            </th>
            <th className="number" data="forks" onClick={setSort}>
              Forks &nbsp;{" "}
              {sortOrder.sort === "forks"
                ? sortOrder.ord === 1
                  ? "^"
                  : "v"
                : ""}
            </th>
            <th className="number" data="stars" onClick={setSort}>
              Stars &nbsp;{" "}
              {sortOrder.sort === "stars"
                ? sortOrder.ord === 1
                  ? "^"
                  : "v"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortList(list, sortOrder, pageNum).map((row) => {
            const initials = row.name?.slice(0, 1) + row.name?.slice(-1);
            return (
              <tr key={row.key}>
                <td className="title">
                  <span className="circle">
                    {initials && initials.toUpperCase()}
                  </span>
                  {row.name}
                </td>
                <td>{row.author}</td>
                <td>{row.forks}</td>
                <td>{row.stars}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SplunkRepos;
