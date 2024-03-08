import { memo } from "react";
import Table from "../common/Table";

const RentalTable = ({ rentals, sortColumn, onSort }) => {
  const columns = [
    {
      path: "customer.name",
      label: "Customer",
    },
    // { path: "movies", label: "Movies" },
    { path: "dateOut", label: "Date Out" },
    { path: "dateReturned", label: "Date Returned" },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={rentals}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </>
  );
};

export default memo(RentalTable);
