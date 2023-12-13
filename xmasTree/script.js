const MAX_ID = 1000; // сколько разных id проверять

function getUsers(ids) {
  var users = [];
  const myUrlWithParams = new URL("https://alluvio.ru/api.php");

  myUrlWithParams.searchParams.append("method", "users.get");
  myUrlWithParams.searchParams.append("user_id", ids);
  myUrlWithParams.searchParams.append("fields", ["user_id", "username", "avatar"]);

  $.ajax({
		url: myUrlWithParams.href,
		method: 'post',
		dataType: 'json',
		async: false,
		success: function(data){
      if(data.response.users)
       users = data.response.users;
		}
	});
  return users;
} 

$("#loadUsers").click(function() {
	var users = [];
  
  let tempArr = [];
  let tempUsersArr = [];
  for(let i = 0; i <= MAX_ID; i++) {
    tempArr.push(i);
    if(tempArr.length == 100) {
      tempUsersArr = getUsers(tempArr);
      console.log(tempUsersArr);
      users.push(...tempUsersArr);
      tempArr = [];
	tempUsersArr = [];
    }
  }
  tempUsersArr = getUsers(tempArr);
  users.push(...tempUsersArr);
 
let ball = `<div class='bauble backgroundAva' style='background-image: url("https://forumavatars.ru{{AVA}}")'> <div class='name'>{{UNAME}}</div></div>`;
  users.forEach((user, index) => { 
    $("#treeGrid").append(
      ball.replace("{{AVA}}", user.avatar).replaceAll('{{UNAME}}', user.username));
  })
});

console.log("~~ v 0.01 ~~");
