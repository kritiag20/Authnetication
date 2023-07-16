import axios from "axios";

var baseURL = process.env.REACT_APP_NACHPAY_BASE_URL;

function CrateCompany(params) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer {{token}}");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(params);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch(baseURL + "/company", requestOptions);
}

// export function login(email, password) {
//   let requestURL =
//     "https://asia-northeast1-willeder-official.cloudfunctions.net/api/auth/login";
//   var requestObj = { email, password };
//   return axios.put(requestURL, JSON.stringify(requestObj), {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

function EditCompany(params) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer {{token}}");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(params);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(baseURL + "/company", requestOptions);
}

// function EditCompany(params) {
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };
//   return fetch("/company", requestOptions);
// }

function ListCompany(params) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  return fetch("/company", requestOptions);
}
function CreateCompanyBank(params) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer {{token}}");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(params);

  // var raw = JSON.stringify({
  //   "account_number": "12354546245",
  //   "MICR": "MICR",
  //   "branch": "Magadi Road",
  //   "IFSC": "IFSC",
  //   "bank_id": 32,
  //   "account_holder_name": "John"
  // });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("/company_banks", requestOptions);
}
function EditcompanyBank(params) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer {{token}}");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(params);

  // var raw = JSON.stringify({
  //   "account_number": "12354546245",
  //   "MICR": "MICR",
  //   "branch": "Magadi Road",
  //   "IFSC": "IFSC",
  //   "bank_id": 32,
  //   "account_holder_name": "John"
  // });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("/company_banks", requestOptions);
}
function ListCompanyBank(params) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch("/company_banks", requestOptions);
}
