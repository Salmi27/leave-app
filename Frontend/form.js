document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const employeeId = document.getElementById("employeeID").value;
  const leaveType = document.getElementById("leaveType").value;
  const days = document.getElementById("days").value;

  fetch("http://localhost:3000/")
    .then((res) => res.json())
    .then((data) => {
      const { users } = data;
      const found = users.some((user) => user.id == employeeId);
      if (found) {
        const [user] = users.filter((user) => user.id == employeeId);
        if (user.act === "wages_board_act") {
          if (leaveType === "annual" && days <= 10 - user.leaveTaken.annual) {
            submitLeave(employeeId, fullName, leaveType);
          } else if (
            leaveType === "casual" &&
            days <= 10 - user.leaveTaken.casual
          ) {
            submitLeave(employeeId, fullName, leaveType);
          } else if (
            leaveType === "casual" &&
            days <= 10 - user.leaveTaken.casual
          ) {
            submitLeave(employeeId, fullName, leaveType);
          } else {
            console.log("Leave Exceeded!!!");
          }
        } else {
          if (leaveType === "annual" && days <= 10 - user.leaveTaken.annual) {
            submitLeave(employeeId, fullName, leaveType);
          } else if (
            leaveType === "casual" &&
            days <= 10 - user.leaveTaken.casual
          ) {
            submitLeave(employeeId, fullName, leaveType);
          } else if (
            leaveType === "casual" &&
            days <= 10 - user.leaveTaken.casual
          ) {
            submitLeave(employeeId, fullName, leaveType);
          } else {
            console.log("Leave Exceeded!!!");
          }
        }
      } else {
        console.log("no match found");
      }
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });

  document.querySelector(".container").innerHTML = `
      <div class="items">
        <h5 class="name">Full Name: ${fullName}</h5>
        <h5 class="id">ID: ${employeeId}</h5>
        <h5 class="leaveType">Leave Type: ${leaveType}</h5>
        <h3>Pending</h3>
      </div>
    `;
});

function getEmployees() {
  fetch("http://localhost:3000/")
    .then((res) => res.json())
    .then((data) => {
      const { users } = data;
      console.log(users);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
}

function submitLeave(id, fullName, leaveType) {
  console.log(leaveType);
  fetch("http://localhost:3000/leave", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      fullName: fullName,
      leaveType: leaveType,
      status: "Pending",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Response from the server: ", data);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
}
