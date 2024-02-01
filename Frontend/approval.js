const container = document.querySelector(".container");

fetch("http://localhost:3000/leave")
  .then((res) => res.json())
  .then((data) => {
    const { pendingLeave } = data;
    console.log(pendingLeave);
    pendingLeave.forEach((item) => {
      container.innerHTML += `
      <div class="item">
      <table> 
        <tr>
          <td>Full Name</td>
          <td>: ${item.fullName}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>: ${item.id}</td>
        </tr>
        <tr>
          <td>Leave Type</td>
          <td>: ${item.leaveType}</td>
        </tr>
        <tr>
          <td>Days</td>
          <td>: ${item.days}</td>
        </tr>
        <tr>
          <td>reason</td>
          <td>: ${item.reason}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>: ${item.phoneNumber}</td>
        </tr>
        <tr>
          <td>E-mail</td>
          <td>: ${item.email}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>: ${item.status}</td>
        </tr>
      </table>
       
        <button class="approve-btn" type="button">Approve</button>
        <button class="reject-btn" type="button">Reject</button>
      </div>
    `;

      document.querySelector(".approve-btn").addEventListener("click", () => {
        submitDecision("approveLeave");
      });

      document.querySelector(".reject-btn").addEventListener("click", () => {
        submitDecision("rejectLeave");
      });

      function submitDecision(decision) {
        fetch(`http://localhost:3000/${decision}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Response from the server: ", data);
          })
          .catch((err) => {
            console.error(`Error: ${err}`);
          });
      }
    });
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });
