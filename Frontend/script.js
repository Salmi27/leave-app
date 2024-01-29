users = [
  {
    id: 1,
    fullName: "blalala",
    leaveType: "wages board act",
    leaveAvailable: 5,
  },
  {
    id: 2,
    fullName: "ggggg",
    leaveType: "wages board act",
    leaveAvailable: 5,
  },
];

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const employeeId = document.getElementById("employeeID").value;
  const leaveType = document.getElementById("leaveType").value;
  const days = document.getElementById("days").value;
  
  users.forEach((user) => {
    if (user.id == employeeId) {
      if (leaveType === "annual") {
        if (days < 20) console.log("success!");
        else console.log("failed!");
      }
    }
  });
});
