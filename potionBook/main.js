var potionsSrc= "https://4edo.github.io/alluvio/potionBook/data.json";

const TEMPLATE_CARD = `<div>
	<h3>{{NAME}}<sup>{{CANONICAL}}</sup></h3>
	{{OTHER_NAMES}}
	{{AUTHOR}}
	{{DIFFICULTY}}
	<h4>Вид:</h4>
	<p>{{FORM}}</p>
	<h4>Описание:</h4>
	<p>{{DESCRIPTION}}</p>
	{{NEEDED}}
	<h4>Полезное действие:</h4>
	<p>{{ACTIONS_GOOD}}</p>
	<h4>Негативное действие:</h4>
	<p>{{ACTIONS_BAD}}</p>
	{{ANTIDOTE}}
	{{TAGS}}
</div>`;

var allTagsSet = new Set();
var allActionsGood = new Set();
var allActionsBad = new Set();
var potions;

async function loadPotions(param = 0) {
	const response = await fetch(potionsSrc);
	potions = await response.json();
	potions = potions.sort((a, b) => {
	  if (a.name < b.name) {
		return -1;
	  }
	});
	//console.log(potions);
	var sidebar = "";
	for (let i = 0; i < potions.length; i++) {
		for(var t in potions[i]["tags"]) {
			allTagsSet.add(potions[i]["tags"][t]);
		}
		for(var ag in potions[i]["actionsGood"]) {
			allActionsGood.add(potions[i]["actionsGood"][ag]);
		}
		for(var ab in potions[i]["actionsBad"]) {
			allActionsBad.add(potions[i]["actionsBad"][ab]);
		}
		sidebar += "<li data-name='"
		+ potions[i]["name"]
		+ `' onclick='showMe("` + potions[i]["name"] + `")'>`;
		sidebar += potions[i]["isCanon"]
			? '<span class="material-symbols-outlined canonMarker" title="Канон">book_3</span>'
			: '<span class="material-symbols-outlined canonMarker" title="Самопальное">person</span>';
		sidebar += potions[i]["isIngr"]
			? '<span class="material-symbols-outlined canonMarker" title="Ингредиент">temp_preferences_eco</span>'
			: "";
		sidebar += potions[i]["name"] + "</li>"; 
	}
	document.getElementById("relList").innerHTML = sidebar;
	let status = "Показано: " + potions.length + ";<br>скрыто: 0;<br>всего: " + potions.length;
	document.getElementById("status").innerHTML = status;
	
	allTagsSet = sortSet(allTagsSet);
	allActionsGood = sortSet(allActionsGood);
	allActionsBad = sortSet(allActionsBad);

	var _formGood = document.getElementById("actGoodCell");
	var _formBad = document.getElementById("actBadCell");
	var _formTags  = document.getElementById("tagsCell");
	
    var _inputActGood = _formGood.appendChild(document.createElement('input'));
    var _inputActBad = _formBad.appendChild(document.createElement('input'));
    var _inputTags = _formTags.appendChild(document.createElement('input'));
	
    var _datalistActGood = _formGood.appendChild(document.createElement('datalist'));
    var _datalistActBad = _formBad.appendChild(document.createElement('datalist'));
    var _datalistTags = _formTags.appendChild(document.createElement('datalist'));

	_datalistActGood.id = 'datalistActGood';
	_datalistActBad.id = 'datalistActBad';
	_datalistTags.id = 'datalistTags';
	
	_inputActGood.setAttribute('list','datalistActGood');
	_inputActBad.setAttribute('list','datalistActBad');
	_inputTags.setAttribute('list','datalistTags');
	
	_inputActGood.setAttribute('id','inpActGood');
	_inputActBad.setAttribute('id','inpActBad');
	_inputTags.setAttribute('id','inpTags');

	var _option = "<option value='Показать всё' />";
	for(let t1 of allTagsSet) {
		_option += "<option value='" + t1 + "' />";
	}
	_datalistTags.innerHTML = _option;
	
	_option = "<option value='Показать всё' />";
	for(let ag1 of allActionsGood) {
		_option += "<option value='" + ag1 + "' />";
	}
	_datalistActGood.innerHTML = _option;
	
	_option = "<option value='Показать всё' />";
	for(let ab1 of allActionsBad) {
		_option += "<option value='" + ab1 + "' />";
	}
	_datalistActBad.innerHTML = _option;
  
  return true;
};
loadPotions(0);
function doFilter(){
	const selectedTag = document.querySelector("#inpTags").value;
	const selectedGood = document.querySelector("#inpActGood").value;
	const selectedBad = document.querySelector("#inpActBad").value;
	const selectedCanon = document.querySelector("#selCanon").value;
	const selectedType = document.querySelector("#selPot").value;
	
	var sidebar = "";
	let isOkTag = false;
	let isOkGood = false;
	let isOkBad = false;
	let isOkCanon = false;
	let isOkType = false;
	
	let show = 0;
	let hide = 0;
	let total = potions.length;
	for (let i = 0; i < potions.length; i++) {
		isOkTag = false;
		isOkGood = false;
		isOkBad = false;
		isOkCanon = false;
		isOkType = false;
		
		if(selectedTag == "" || selectedTag == "Показать всё") {
			isOkTag = true;
		} else {
			isOkTag = potions[i]["tags"].includes(selectedTag);
		}
		
		if(selectedGood == "" || selectedGood == "Показать всё") {
			isOkGood = true;
		} else {
			isOkGood = potions[i]["actionsGood"].includes(selectedGood);
		}
		
		if(selectedBad == "" || selectedBad == "Показать всё") {
			isOkBad = true;
		} else {
			isOkBad = potions[i]["actionsBad"].includes(selectedBad);
		}

		if(selectedCanon == "all") {
			isOkCanon = true;
		} else if(selectedCanon == "canon") {
			isOkCanon = potions[i]["isCanon"];
		} else {
			isOkCanon = !potions[i]["isCanon"];
		}
		
		if(selectedType == "all") {
			isOkType = true;
		} else if(selectedType == "ingr") {
			isOkType = potions[i]["isIngr"];
		} else {
			isOkType = !potions[i]["isIngr"];
		}
		
		let isVisible;
		if(isOkTag && isOkGood && isOkBad && isOkCanon && isOkType) {
			isVisible = "show";
			show++;
		} else {
			isVisible = "hide";
			hide++;
		}
		
		sidebar += "<li class='"+ isVisible +"' data-name='"
		+ potions[i]["name"]
		+ `' onclick='showMe("` + potions[i]["name"] + `")'>`;
		
		sidebar += potions[i]["isCanon"]
			? '<span class="material-symbols-outlined canonMarker" title="Канон">book_3</span>'
			: '<span class="material-symbols-outlined canonMarker" title="Самопальное">person</span>';
		sidebar += potions[i]["isIngr"]
			? '<span class="material-symbols-outlined canonMarker" title="Ингредиент">temp_preferences_eco</span>'
			: "";
		sidebar += potions[i]["name"] + "</li>"; 
	}
	let status = "Показано: " + show + ";<br>скрыто: " + hide + ";<br>всего: " + total;
	document.getElementById("relList").innerHTML = sidebar;
	document.getElementById("status").innerHTML = status;
}

function showMe(potName) {
	let potionCard = TEMPLATE_CARD;
	let findedPotion = findPotByName(potName);
	if(findedPotion == 0) return;
	let antidotes = "";
	let ingredients = "";
	
	potionCard = potionCard.replace("{{NAME}}", findedPotion["name"]); 
	potionCard = potionCard.replace("{{CANONICAL}}", findedPotion["isCanon"] ? "каноничное" : ""); 
	potionCard = potionCard.replace("{{OTHER_NAMES}}", findedPotion["otherNames"] && findedPotion["otherNames"].length != 0
		? "<p>Иные названия: <i>" + findedPotion["otherNames"].join(', ') + "</i></p>"
		: ""); 
		
	let author = "";
	author += findedPotion["isIngr"] ? "<p><b>Первооткрыватель</b>: <i>" : "<p><b>Создатель</b>: <i>";
	author += findedPotion["author"] && findedPotion["author"]!="" ? findedPotion["author"] : "Неизвестен";
	author += findedPotion["createDate"] && findedPotion["createDate"]!="" ? "(открыто " + findedPotion["createDate"] + ")": "";
	author += "</i></p>";
	potionCard = potionCard.replace("{{AUTHOR}}", findedPotion["author"] && findedPotion["author"]!="" ? author : ""); 
	
	let diff = "<p><b>Сложность:</b> <i>";
	switch(findedPotion["difficulty"]){
		case 1:
		  diff += "Элементарно, справится даже ребёнок.";
		  break;
		case 2:
		  diff += "Достаточно просто, справится домохозяйка.";
		  break;
		case 3:
		  diff += "Средне, придётся постараться.";
		  break;
		case 4:
		  diff += "Сложно, требуется большой опыт.";
		  break;
		case 5:
		  diff += "Очень сложно, работа для мастера.";
		  break;
		default:
		  diff += "Не определено.";
		  break;
	}
	diff += "</i></p>";
	potionCard = potionCard.replace("{{DIFFICULTY}}", findedPotion["isPotion"] ? diff : ""); 
	potionCard = potionCard.replace("{{FORM}}", findedPotion["form"] ? findedPotion["form"] : ""); 
	potionCard = potionCard.replace("{{DESCRIPTION}}", findedPotion["description"] ? findedPotion["description"] : ""); 
	
	let needed = "<h4>Состав:</h4><p><i>";
	let neededArr = [];
	for(var ingr in findedPotion["neededList"]) {
		neededArr.push(returnClickableSpanIfPotExistElseString(findedPotion["neededList"][ingr]));
	}
	needed += neededArr.join(', ');
	needed += "</i></p>";
	potionCard = potionCard.replace("{{NEEDED}}", needed); 

	let ant = "";
	if(findedPotion["antidote"] && findedPotion["antidote"].length != 0) {
		ant = "<h4>Противоядия:</h4><p><i>";
		let antArr = [];
		for(var ingr in findedPotion["antidote"]) {
			antArr.push(returnClickableSpanIfPotExistElseString(findedPotion["antidote"][ingr]));
		}
		ant += antArr.join(', ');
		ant += "</i></p>";
	}
	potionCard = potionCard.replace("{{ANTIDOTE}}", ant);
	
	
	potionCard = potionCard.replace("{{ACTIONS_GOOD}}", findedPotion["actionsGood"].join(', ')); 
	potionCard = potionCard.replace("{{ACTIONS_BAD}}", findedPotion["actionsBad"].join(', ')); 
	potionCard = potionCard.replace("{{TAGS}}", findedPotion["tags"] && findedPotion["tags"].length != 0
		? "<h4>Метки: </h4><p><i>" + findedPotion["tags"].join(', ') + "</i></p>"
		: "");

	document.getElementById("entity").innerHTML = potionCard;
}

function sortSet(set) {
  const entries = [];
  for (const member of set) {
    entries.push(member);
  }
  set.clear();
  for (const entry of entries.sort()) {
    set.add(entry);
  }
  return set;
};

function findPotByName(potName){
	for (let i = 0; i < potions.length; i++){
		if (potions[i]["name"].toLowerCase() == potName.toLowerCase()) {
			return potions[i];
		} else {
			for(var nm in potions[i]["otherNames"]) {
				if(potions[i]["otherNames"][nm].toLowerCase() == potName.toLowerCase()) {
					console.log("Other name: " + potions[i]["otherNames"][nm]);
					return potions[i];
				}
			}
		}
	}
	return 0;
}
function returnClickableSpanIfPotExistElseString(potName) {
	let existIngr = findPotByName(potName);
	let temp = `<span class="existPot" title="Открыть" onclick="showMe('{{POT_NAME_MAIN}}')">{{POT_NAME}}</span>`;
	if(existIngr == 0) {
		return potName;
	} else {
		return temp
			.replace("{{POT_NAME_MAIN}}", existIngr["name"].toLowerCase())
			.replace("{{POT_NAME}}", potName);
	}
}
