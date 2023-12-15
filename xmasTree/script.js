const VERSION = "v 1.19";


console.log("~~ VIEWER_NAME " + VIEWER_NAME + " ~~");
console.log("~~ X-mas tree " + VERSION + " init ~~");

$("#findMe").on('change keyup paste', function () {
	applyFilter();
});

function applyFilter() {
	var searchString = $("#findMe").val();
	$(".finded").removeClass("finded");
	if(searchString != "") {
		$(".bauble:contains('" + searchString + "')").addClass("finded");
	}
}
var params = location.href.split('?')[1].split('&');
if(params["uname"].split('=')[0]) {
	 $("#findMe").val(params["uname"].split('=')[1]);
}


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

function addTable() {

  var table = document.createElement('TABLE');
  table.border = '0';

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);
	var cellId = 0;

  for (var i = 0; i < 50; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);

    for (var j = 0; j < 50; j++) {
      var td = document.createElement('TD');
      td.width = '60';
      td.height = '60';
	//td.setAttribute('onclick', "this.style.backgroundColor = 'Red';");
	td.setAttribute('cellId', cellId);
	//td.setAttribute('title', cellId);
	    cellId++;
      tr.appendChild(td);
    }
  }
  $("#treeGrid").append(table);
}
addTable();

function init() {
	var maxId = getLastRegisteredUserId();
	var users = getUsers();
	let ball = `<div class='bauble backgroundAva' style='background-image: url("https://forumavatars.ru{{AVA}}")'> <div class='name'>{{UNAME}}</div></div>`;
	let placesOnTree = [ "224", "274", "275", "276", "277", "325", "326", "327", "328", "372", "373", "374", "375", "376", "377", "422", "423", "424", "425", "426", "427", "472", "473", "474", "475", "476", "477", "522", "523", "524", "525", "526", "527", "528", "529", "572", "573", "574", "575", "576", "577", "578", "579", "622", "623", "624", "625", "626", "627", "628", "631", "672", "673", "674", "675", "676", "677", "678", "679", "680", "681", "721", "722", "723", "724", "725", "726", "727", "728", "729", "730", "771", "772", "773", "774", "775", "776", "777", "778", "779", "780", "818", "819", "820", "821", "822", "823", "824", "825", "826", "827", "828", "829", "869", "870", "871", "872", "873", "874", "875", "876", "877", "878", "879", "917", "918", "919", "920", "921", "922", "923", "924", "925", "926", "927", "928", "929", "930", "931", "968", "969", "970", "971", "972", "973", "974", "975", "976", "977", "978", "979", "980", "981", "982", "1019", "1020", "1021", "1022", "1023", "1024", "1025", "1026", "1027", "1028", "1029", "1030", "1031", "1032", "1066", "1067", "1068", "1069", "1070", "1071", "1072", "1073", "1074", "1075", "1076", "1077", "1078", "1079", "1080", "1081", "1082", "1083", "1116", "1117", "1118", "1119", "1120", "1121", "1122", "1123", "1124", "1125", "1126", "1127", "1128", "1129", "1130", "1131", "1132", "1133", "1166", "1167", "1168", "1169", "1170", "1171", "1172", "1173", "1174", "1175", "1176", "1177", "1178", "1179", "1180", "1181", "1217", "1218", "1219", "1220", "1221", "1222", "1223", "1224", "1225", "1226", "1227", "1228", "1229", "1230", "1231", "1232", "1233", "1268", "1269", "1270", "1271", "1272", "1273", "1274", "1275", "1276", "1277", "1278", "1279", "1280", "1281", "1282", "1283", "1315", "1316", "1317", "1318", "1319", "1320", "1321", "1322", "1323", "1324", "1325", "1326", "1327", "1328", "1329", "1330", "1331", "1332", "1333", "1334", "1335", "1336", "1365", "1366", "1367", "1368", "1369", "1370", "1371", "1372", "1373", "1374", "1375", "1376", "1377", "1378", "1379", "1380", "1381", "1382", "1383", "1384", "1385", "1386", "1387", "1413", "1414", "1415", "1416", "1417", "1418", "1419", "1420", "1421", "1422", "1423", "1424", "1425", "1426", "1427", "1428", "1429", "1430", "1431", "1432", "1433", "1434", "1435", "1436", "1437", "1463", "1464", "1465", "1466", "1467", "1468", "1469", "1470", "1471", "1472", "1473", "1474", "1475", "1476", "1477", "1478", "1479", "1480", "1481", "1482", "1483", "1484", "1485", "1486", "1513", "1514", "1515", "1516", "1517", "1518", "1519", "1520", "1521", "1522", "1523", "1524", "1525", "1526", "1527", "1528", "1529", "1530", "1531", "1532", "1533", "1534", "1535", "1536", "1537", "1563", "1564", "1565", "1566", "1567", "1568", "1569", "1570", "1571", "1572", "1573", "1574", "1575", "1576", "1577", "1578", "1579", "1580", "1581", "1582", "1583", "1584", "1585", "1586", "1614", "1615", "1616", "1617", "1618", "1619", "1620", "1621", "1622", "1623", "1624", "1625", "1626", "1627", "1628", "1629", "1630", "1631", "1632", "1633", "1634", "1635", "1636", "1664", "1665", "1666", "1667", "1668", "1669", "1670", "1671", "1672", "1673", "1674", "1675", "1676", "1677", "1678", "1679", "1680", "1681", "1682", "1683", "1684", "1685", "1686", "1687", "1688", "1711", "1712", "1713", "1714", "1715", "1716", "1717", "1718", "1719", "1720", "1721", "1722", "1723", "1724", "1725", "1726", "1727", "1728", "1729", "1730", "1731", "1732", "1733", "1734", "1735", "1736", "1737", "1738", "1762", "1763", "1764", "1765", "1766", "1767", "1768", "1769", "1770", "1771", "1772", "1773", "1774", "1775", "1776", "1777", "1778", "1779", "1780", "1781", "1782", "1783", "1784", "1785", "1786", "1787", "1788", "1813", "1814", "1815", "1816", "1817", "1818", "1819", "1820", "1821", "1822", "1823", "1824", "1825", "1826", "1827", "1828", "1829", "1830", "1831", "1832", "1833", "1834", "1835", "1836", "1864", "1865", "1866", "1867", "1870", "1871", "1873", "1874", "1875", "1876", "1880", "1882", "1883", "1884", "1887", "1927", "1928"];
	 shuffle(placesOnTree);
	let placeId = 0;
	users.forEach((user, index) => {
		let needStar = user.group_id == 1 ? "<div class='star'></div>" : "";
		let placeOnTreeFact;
		if(user.user_id != 2) {
			placeOnTreeFact = placesOnTree[placeId];
			placeId++;
		} else {
			placeOnTreeFact = 126;
		}
		  document.querySelector("[cellid='" + placeOnTreeFact + "']").innerHTML = needStar + ball.replace("{{AVA}}", user.avatar).replaceAll('{{UNAME}}', user.username);
		  
	  });
}
init();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


/*
Для поиска свободных мест на ёлке:

var listDivs = document.body.getElementsByTagName("td");
var selected = [];
for (i = 0; i<listDivs.length; i++){
    div=listDivs[i];
    if(div.style.backgroundColor =='red'){
        selected.push(div.getAttribute('cellid')); // use innerHTML if you want the HTML
    }
}
console.log(selected);

*/

