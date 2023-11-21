const deletePassword = (Website) => {
    let data = localStorage.getItem("Passwords");
    let arr = JSON.parse(data) || []; // Initialize to an empty array if no data is present
    let arrUpdate = arr.filter((e) => {
      return e.Website !== Website; // Use strict equality !== to compare strings
    });
    localStorage.setItem("Passwords", JSON.stringify(arrUpdate));
    showPasswords();
  };
  
  const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("Passwords");
  
    if (data === null || JSON.parse(data).length === 0) { // Use strict equality ===
      tb.innerHTML = "<tr><th>Website</th><th>UserName</th><th>Password</th><th>Delete</th></tr><tr><td colspan='4'>NO Data To Show</td></tr>";
    } else {
      tb.innerHTML = `<tr>
          <th>Website</th>
          <th>UserName</th>
          <th>Password</th>
          <th>Delete</th>
        </tr>`;
  
      let arr = JSON.parse(data);
      let str = "";
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        str += `<tr>
                      <td>${element.Website}</td>
                      <td>${element.UserName}</td>
                      <td>${element.Password}</td>
                      <td><button class="btnd" id="${element.Website}" onclick="deletePassword('${element.Website}')">Delete</button></td>
                      </tr>`;
      }
  
      tb.innerHTML = tb.innerHTML + str;
    }
    // Clear input fields (if you have input fields with id="Website", id="UserName", and id="Password")
    document.getElementById("Website").value = "";
    document.getElementById("UserName").value = "";
    document.getElementById("Password").value = "";
  };
  
  showPasswords();
  
  let button = document.querySelector(".btn");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let Website = document.getElementById("Website").value;
    let UserName = document.getElementById("UserName").value;
    let Password = document.getElementById("Password").value;
    
    // Check if any field is empty
    if (!Website || !UserName || !Password) {
      alert("Please fill in all fields.");
      return; // Exit the function early
    }
  
    let Passwords = JSON.parse(localStorage.getItem("Passwords")) || [];
    Passwords.push({
      Website: Website,
      UserName: UserName,
      Password: Password,
    });
    
    localStorage.setItem("Passwords", JSON.stringify(Passwords));
    showPasswords();
  });