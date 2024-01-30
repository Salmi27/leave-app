const container = document.querySelector(".container");

fetch("http://localhost:3000/leave")
  .then((res) => res.json())
  .then((data) => {
    const { pendingLeave } = data;
    console.log(pendingLeave);
    pendingLeave.forEach((item) => {
      container.innerHTML += `
        <h5 class="name">Full Name: ${item.fullName}</h5>
        <h5 class="id">ID: ${item.id}</h5>
    `;
    });
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });
