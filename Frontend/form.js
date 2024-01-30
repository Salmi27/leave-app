// const users = [
//   {
//     id: 1,
//     fullName: "blalala",
//     act: "wages_board_act",
//     leaveTaken: {
//       annual: 2,
//       casual: 14,
//       medical: 10,
//     },
//   },
//   {
//     id: 2,
//     fullName: "ggggg",
//     act: "shop_office_act",
//     leaveTaken: {
//       annual: 5,
//       casual: 5,
//       medical: 21,
//     },
//   },
// ];

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
            submitLeave(employeeId, fullName);
            getEmployees();
          } else if (
            leaveType === "casual" &&
            days <= 10 - user.leaveTaken.casual
          ) {
            submitLeave(employeeId, fullName);
            getEmployees();
          } else if (
            leaveType === "casual" &&
            days <= 10 - user.leaveTaken.casual
          ) {
            submitLeave(employeeId, fullName);
            getEmployees();
          } else {
            console.log("Leave Exceeded!!!");
          }
        } else {
          if (leaveType === "annual") {
            days <= 14 - user.leaveTaken.annual
              ? console.log("Leave approved!!")
              : console.log("Leave Exceeded!!");
          } else if (leaveType === "casual") {
            days <= 7 - user.leaveTaken.casual
              ? console.log("Leave approved!!")
              : console.log("Leave Exceeded!!");
          } else {
            days <= 21 - user.leaveTaken.medical
              ? console.log("Leave approved!!")
              : console.log("Leave Exceeded!!");
          }
        }
      } else {
        console.log("no match found");
      }
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
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

function submitLeave(id, fullName) {
  fetch("http://localhost:3000/leave", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      fullName: fullName,
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
