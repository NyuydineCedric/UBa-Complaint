import "./Users.css";

function Users() {
  return (
    <div className="users-page">
      <div className="page-heading">
        <div>
          <h1>Users</h1>
          <p>Manage system users, roles, and permissions.</p>
        </div>
        <button className="primary-button">Add User</button>
      </div>

      <div className="user-table-card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="user-info">
                  <img src="https://via.placeholder.com/40" alt="User" />
                  <div>
                    <strong>Administrator</strong>
                    <span>admin@uba.edu</span>
                  </div>
                </div>
              </td>
              <td>admin@uba.edu</td>
              <td>Super Admin</td>
              <td>
                <span className="role-chip active">Active</span>
              </td>
              <td>
                <button className="icon-button">Edit</button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="user-info">
                  <img src="https://via.placeholder.com/40" alt="User" />
                  <div>
                    <strong>Michael Brown</strong>
                    <span>michael@uba.edu</span>
                  </div>
                </div>
              </td>
              <td>michael@uba.edu</td>
              <td>Complaint Officer</td>
              <td>
                <span className="role-chip active">Active</span>
              </td>
              <td>
                <button className="icon-button">Edit</button>
              </td>
            </tr>
            <tr>
              <td>
                <div className="user-info">
                  <img src="https://via.placeholder.com/40" alt="User" />
                  <div>
                    <strong>Laura White</strong>
                    <span>laura@uba.edu</span>
                  </div>
                </div>
              </td>
              <td>laura@uba.edu</td>
              <td>Support</td>
              <td>
                <span className="role-chip inactive">Inactive</span>
              </td>
              <td>
                <button className="icon-button">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
