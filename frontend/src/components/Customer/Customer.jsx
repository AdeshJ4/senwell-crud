import _ from "lodash";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import {
  deleteCustomer,
  getCustomers,
  getCustomersByMemberships,
  getCustomersBySearchQuery,
} from "../../services/customerService";
import { Link } from "react-router-dom";
import CustomerTable from "../Customer/CustomerTable";
import Pagination from "../common/Pagination";
import SearchBox from "../common/SearchBox";
import ListGroup from "../common/ListGroup";

const Customer = ({ user }) => {
  const [customers, setCustomers] = useState([]);
  const memberships = useRef([
    { _id: 1, name: "Normal" },
    { _id: 2, name: "Bronze" },
    { _id: 3, name: "Silver" },
    { _id: 4, name: "Gold" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" }); // customer name is "name"
  const [count, setTotalCount] = useState();
  const [selectedMembership, setSelectedMembership] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        let customersData;
        if (searchQuery) {
          customersData = await getCustomersBySearchQuery(
            searchQuery,
            currentPage
          );
        } else if (selectedMembership) {
          customersData = await getCustomersByMemberships(
            selectedMembership,
            currentPage
          );
        } else {
          customersData = await getCustomers(currentPage);
        }
        const sorted = _.orderBy(
          customersData.data.customers,
          [sortColumn.path],
          [sortColumn.order]
        );
        setCustomers(sorted);
        setTotalCount(customersData.data.count);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchCustomers();
  }, [currentPage, searchQuery, selectedMembership]);

  // delete customers
  const handleDelete = useCallback(
    async (customer) => {
      const originalCustomers = [...customers];
      try {
        setCustomers(customers.filter((c) => c._id !== customer._id));
        await deleteCustomer(customer._id);
      } catch (err) {
        console.log(err.response);
        if (err.response && err.response.status === 404) {
          toast.error("This customer has already been deleted.");
        }
        setCustomers(originalCustomers);
      }
    },
    [customers]
  );

  // you will get page no from Pagination and according to that you have to fetch customers
  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      setCurrentPage(1);
    },
    [searchQuery]
  );

  const handleSort = useCallback(
    (sortColumn) => {
      setSortColumn(sortColumn);
      const sorted = _.orderBy(
        customers,
        [sortColumn.path],
        [sortColumn.order]
      );
      setCustomers(sorted);
    },
    [sortColumn, customers]
  );

  const handleMembershipSelect = useCallback(
    (membership) => {
      setSelectedMembership(membership);
      setSearchQuery("");
      setCurrentPage(1);
    },
    [selectedMembership]
  );

  if (count === 0) <p>There are no customers in the database.</p>;

  return (
    <div className="row">
      <div className="col-md-3 mb-3">
        <ListGroup
          items={memberships.current}
          selectedItem={selectedMembership}
          onItemSelect={handleMembershipSelect}
        />
      </div>

      <div className="col-md-9">
        {user && (
          <Link
            to="/customers/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Customer
          </Link>
        )}
        <p class="text-muted">
          Showing <span class="text-primary">{count}</span> Customers in the
          database.
        </p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <CustomerTable
          customers={customers}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Customer;
