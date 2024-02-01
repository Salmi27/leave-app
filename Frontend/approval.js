const container = document.querySelector(".container");

fetch("http://localhost:3000/leave")
  .then((res) => res.json())
  .then((data) => {
    const { pendingLeave } = data;
    console.log(pendingLeave);
    pendingLeave.forEach((item) => {
      container.innerHTML += `
      <div class="items">
        <h5 class="name">Full Name: ${item.fullName}</h5>
        <h5 class="id">ID: ${item.id}</h5>
        <h5 class="leaveType">Leave Type: ${item.leaveType}</h5>
        <h5 class="status">Status: ${item.status}</h5>
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
