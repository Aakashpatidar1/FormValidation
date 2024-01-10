debugger;
var empDataArray = [];

$("#empFormSubmit").click((a) => {
  a.preventDefault();

  var fName = $("#fName").val();
  var lName = $("#lName").val();
  var emailValue = $("#email").val(); // Use a different variable for email input value
  var pwd  = $("#pwd").val();

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var emailValid = emailRegex.test(emailValue); // Use a different variable for email validation

  var pwdValid = pwd.length >= 8;

  if (fName === "" || lName === "" || emailValue === "" || pwd === "") {
    erroronSubmit();
  } else if (!emailValid || !pwdValid) {
     Swal.fire({
      icon: "error",
      title: "Invalid Email or Password",
      text:
        "Please enter a valid email address and ensure the password is at least 8 characters long.",
    }); 
  }else {
         if (!isEmailDuplicate(emailValue)) {
         var empData = {
          fName: fName,
          lName: lName,
          email: emailValue,
          pwd: pwd,
        };
        submitDate(empData);
        renderTable();
      } else {
        Swal.fire({
          icon: "error",
          title: "Duplicate Email",
          text: "This email address is already in use. Please use a different email.",
        });
      }
    } 
  }); 
  function isEmailDuplicate(email) {
    return empDataArray.some((a) => a.email === email);
  }

$('body').on('click', '.btn-danger', function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      var id = $(this).attr("id");
      empDataArray = empDataArray.filter((a) => a.email !== id);
      renderTable();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
});

function clearField() {
  $("#fName").val("");
  $("#lName").val("");
  $("#email").val("");
  $("#pwd").val("");
}

function submitDate(empData) {
  empDataArray.push(empData); 
  console.log(empDataArray);
  clearField();
  Swal.fire({
    title: "Employee Data has been stored",
    text: "You clicked the button!",
    icon: "success",
  });
}

function erroronSubmit() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}

function renderTable() { 
  var empHtmlString = "";
  var secret = "apple@#$";  
  var secret1="shekharraghu111@gmail.com";
  
  empDataArray.forEach((a) => {
     empHtmlString += "<tr>";
     empHtmlString += "<td>" + a.fName + "</td>";
     empHtmlString += "<td>" + a.lName + "</td>";
     
    
     alert("Entered Password: " + a.pwd);  
     alert("Entered Email: " + a.email); 
     var encPwd = CryptoJS.AES.encrypt(a.pwd, secret).toString();  
     var encEmail = CryptoJS.AES.encrypt(a.email, secret1).toString(); 
     empHtmlString += `<td>${encPwd}</td>`;
     empHtmlString += `<td>${encEmail}</td>`;
     
     empHtmlString +=`<td><button id="${a.email}" class="btn-lg btn btn-danger fa fa-trash-o"></button></td>`;
     empHtmlString += "</tr>";
  });
  
  $("#showData").html(empHtmlString);
} 
debugger;