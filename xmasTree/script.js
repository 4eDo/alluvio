function getUsers() {
	let users;
	$.ajax({
		url: 'https://alluvio.ru/api.php',
		method: 'get',
		dataType: 'json',
		data: {
			method: "users.get",
			user_id: [740,741,742,743,744,745,746],
      fields: ["user_id", "username", "avatar"]
		},
		async: false,
		success: function(data){
				console.log(data);
			if(data.error) {
				console.log("Error on getUsers method");console.log(data);
			} else {
	//console.log("getLastInventory invStr = " + data.response.storage.data.backup_inventory);
        console.log(data);
				users = data.response.user;
			}
		}
	});
	return users;
} 

$("#loadUsers").click(function() {
	getUsers();
});

console.log("~~ v 0.01 ~~");
