document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const employeeId = document.getElementById("employeeID").value;
  const leaveType = document.getElementById("leaveType").value;
  const reason = document.getElementById("reason").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const days = calculateDays(startDate, endDate);
  if (days <= 0) {
    alert("Invalid time period. Please Check the Start Date and End Date!");
    return;
  }

  fetch("http://localhost:3000/")
    .then((res) => res.json())
    .then((data) => {
      const { users } = data;
      const found = users.some((user) => user.id == employeeId);
      if (found) {
        const [user] = users.filter((user) => user.id == employeeId);
        if (user.act === "wages_board_act") {
          if (leaveType === "annual" && days <= 10 - user.leaveTaken.annual) {
            submitLeave(
              employeeId,
              fullName,
              leaveType,
              days,
              reason,
              phoneNumber,
              email,
              startDate,
              endDate
            );
          } else if (
            leaveType === "casual" &&
            days <= 10 - user.leaveTaken.casual
          ) {
            submitLeave(
              employeeId,
              fullName,
              leaveType,
              days,
              reason,
              phoneNumber,
              email,
              startDate,
              endDate
            );
          } else if (
            leaveType === "medical" &&
            days <= 10 - user.leaveTaken.medical
          ) {
            submitLeave(
              employeeId,
              fullName,
              leaveType,
              days,
              reason,
              phoneNumber,
              email,
              startDate,
              endDate
            );
          } else {
            alert(
              `Leave Exceeded. \nYou have: \n - Annual Leave ${
                10 - user.leaveTaken.annual
              }\n - Casual Leave ${
                10 - user.leaveTaken.casual
              }\n - Medical Leave ${10 - user.leaveTaken.medical}`
            );
          }
        } else {
          if (leaveType === "annual" && days <= 14 - user.leaveTaken.annual) {
            submitLeave(
              employeeId,
              fullName,
              leaveType,
              days,
              reason,
              phoneNumber,
              email,
              startDate,
              endDate
            );
          } else if (
            leaveType === "casual" &&
            days <= 7 - user.leaveTaken.casual
          ) {
            submitLeave(
              employeeId,
              fullName,
              leaveType,
              days,
              reason,
              phoneNumber,
              email,
              startDate,
              endDate
            );
          } else if (
            leaveType === "medical" &&
            days <= 21 - user.leaveTaken.medical
          ) {
            submitLeave(
              employeeId,
              fullName,
              leaveType,
              days,
              reason,
              phoneNumber,
              email,
              startDate,
              endDate
            );
          } else {
            alert(
              `Leave Exceeded. \nYou have: \n - Annual Leave ${
                14 - user.leaveTaken.annual
              }\n - Casual Leave ${
                7 - user.leaveTaken.casual
              }\n - Medical Leave ${21 - user.leaveTaken.medical}`
            );
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

// Function to Get all employee details
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

// Function to make POST request
function submitLeave(
  id,
  fullName,
  leaveType,
  days,
  reason,
  phoneNumber,
  email,
  startDate,
  endDate
) {
  console.log(days);
  fetch("http://localhost:3000/leave", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      fullName: fullName,
      leaveType: leaveType,
      days: days,
      reason: reason,
      phoneNumber: phoneNumber,
      email: email,
      startDate: startDate,
      endDate: endDate,
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

  window.location.href =
    "http://127.0.0.1:5500/Frontend/formStatus.html?id=" + id;
}

// Function to calculate number of leave days
function calculateDays(start, end) {
  let date1 = new Date(start);
  let date2 = new Date(end);

  let timestamp1 = date1.getTime();
  let timestamp2 = date2.getTime();

  let differenceInMilliseconds = timestamp2 - timestamp1;
  let differenceInDays = Math.floor(
    differenceInMilliseconds / (24 * 60 * 60 * 1000)
  );

  return differenceInDays;
}
