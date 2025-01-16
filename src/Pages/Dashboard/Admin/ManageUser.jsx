import PrimayBtn from "../../../shared/Buttons/PrimayBtn";

const ManageUser = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Search Bar */}
      <div className="form-control mb-6 max-w-md">
        <div className="input-group flex gap-2">
          <input
            type="text"
            placeholder="Search by username or email"
            className="input input-bordered w-full"
          />
          {/* <button className="btn bg-green-700 hover:bg-green-800 text-white">
            Search
          </button> */}
          <PrimayBtn title={"Search"} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {/* Example Row 1 */}
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>johndoe@example.com</td>
              <td>
                <span className="badge badge-info">Silver</span>
              </td>
              <td>
                <button className="btn btn-primary btn-sm">Make Admin</button>
              </td>
            </tr>
            {/* Example Row 2 */}
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>janesmith@example.com</td>
              <td>
                <span className="badge badge-warning">Gold</span>
              </td>
              <td>
                <button className="btn btn-primary btn-sm">Make Admin</button>
              </td>
            </tr>
            {/* Example Row 3 */}
            <tr>
              <td>3</td>
              <td>Michael Johnson</td>
              <td>michaelj@example.com</td>
              <td>
                <span className="badge badge-secondary">Platinum</span>
              </td>
              <td>
                <button className="btn btn-primary btn-sm">Make Admin</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
