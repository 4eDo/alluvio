const VERSION = "v 1.03";


console.log("~~ X-mas tree " + VERSION + " init ~~");

function getLastRegisteredUserId() {
  var lastId = 0;
  const myUrlWithParams = new URL("https://alluvio.ru/api.php");

  myUrlWithParams.searchParams.append("method", "board.get");
  myUrlWithParams.searchParams.append("fields", "last_registered_user_id");

  $.ajax({
	url: myUrlWithParams.href,
	method: 'post',
	dataType: 'json',
	async: false,
	success: function(data){
	      if(data.response.last_registered_user_id)
		lastId = data.response.last_registered_user_id;
	}
});
  return lastId;
}

function getUsers() {
  var users = [];
  const myUrlWithParams = new URL("https://alluvio.ru/api.php");

  myUrlWithParams.searchParams.append("method", "users.get");
  myUrlWithParams.searchParams.append("group_id", [1,4]);
  myUrlWithParams.searchParams.append("fields", ["user_id", "username", "avatar", "group_id"]);
  myUrlWithParams.searchParams.append("limit", 500);

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

function init() {
	var maxId = getLastRegisteredUserId();
	var users = getUsers();
	let ball = `<div class='bauble backgroundAva' style='background-image: url("https://forumavatars.ru{{AVA}}")'> <div class='name'>{{UNAME}}</div></div>`;
	  users.forEach((user, index) => { 
	    $("#treeGrid").append(
	      ball.replace("{{AVA}}", user.avatar).replaceAll('{{UNAME}}', user.username));
	  });
}
init();

