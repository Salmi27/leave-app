import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = [
  {
    id: 1,
    fullName: "Mark",
    act: "wages_board_act",
    leaveTaken: {
      annual: 2,
      casual: 9,
      medical: 10,
    },
  },
  {
    id: 2,
    fullName: "Kevin",
    act: "shop_office_act",
    leaveTaken: {
      annual: 5,
      casual: 5,
      medical: 21,
    },
  },
];

const leaveRequest = [];

app.get("/", (req, res) => {
  return res.json({ users: users });
});

app.post("/leave", (req, res) => {
  const requestId = leaveRequest.length + 1;
  const user = {
    requestId: requestId,
    id: req.body.id,
    fullName: req.body.fullName,
    leaveType: req.body.leaveType,
    days: req.body.days,
    reason: req.body.reason,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    status: req.body.status,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  leaveRequest.push(user);
  return res.json({ leaveRequest: leaveRequest });
});

app.get("/leave", (req, res) => {
  if (leaveRequest) {
    return res.json({ leaveRequest: leaveRequest });
  }

  return res.json({ leaveRequest: "No pending requests" });
});

app.post("/approveLeave", (req, res) => {
  const { id, leaveType, requestId, days } = req.body;

  const requestIndex = leaveRequest.findIndex(
    (item) => item.id == id && item.requestId == requestId
  );
  leaveRequest[requestIndex].status = "Approved";

  const userIndex = users.findIndex((item) => item.id == id);
  users[userIndex].leaveTaken[`${leaveType}`] += days;

  return res.json({ approvedUser: leaveRequest[requestIndex], users: users });
});

app.post("/rejectLeave", (req, res) => {
  const { id, requestId } = req.body;

  const requestIndex = leaveRequest.findIndex(
    (item) => item.id == id && item.requestId == requestId
  );
  leaveRequest[requestIndex].status = "Rejected";

  return res.json({ rejectedUser: leaveRequest[requestIndex] });
});

app.listen(3000, () => console.log("Hey Server Is Running...!"));
