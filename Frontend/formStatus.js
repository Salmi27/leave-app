const params = new URLSearchParams(window.location.search);

fetch("http://localhost:3000/leave")
  .then((res) => res.json())
  .then((data) => {
    const { pendingLeave } = data;
    const users = pendingLeave.filter((user) => user.id == params.get("id"));
    users.forEach((user) => {
      document.querySelector(".items").innerHTML += `
      <div class="item">
      <table>
        <tr>
          <td>Full Name</td>
          <td>: ${user.fullName}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>: ${user.id}</td>
        </tr>
        <tr>
          <td>Leave Type</td>
          <td>: ${user.leaveType}</td>
        </tr>
        <tr>
          <td>Days</td>
          <td>: ${user.days}</td>
        </tr>
        <tr>
          <td>Reason</td>
          <td>: ${user.reason}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>: ${user.phoneNumber}</td>
        </tr>
        <tr>
          <td>E-mail</td>
          <td>: ${user.email}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>: <span class='${user.status == "Approved" ? "green" : "red"}'>${
        user.status
      }</span></td>
        </tr>
      </table>
      </div>
  `;
    });
  });
