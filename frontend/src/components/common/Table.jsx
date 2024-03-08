import React, { memo } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns, data, sortColumn, onSort }) => {
  return (
    <>
      <div class="table-responsive mb-3">
        <table className="table table-bordered table-hover border-primary">
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody columns={columns} data={data} />
        </table>
      </div>
    </>
  );
};

export default memo(Table);
