   // // // // // // //
  // Will Brandon   //
 // 4/15/2021      //
// // // // // // //

/* WARNING:
 *	This code is not very neat. I started off with great
 *	intentions but stuff got sloppy because to be honest
 *	I hate JavaScript. Java is a far more organized language
 *	but oh well. Good luck if you're trying to understand
 *	what's going on here.
 */

var elements = {};
var tool = {};
var dynamics = {
	listeners: {}
};
var prism = {};

function onLoad() {
	elements.init();
	tool.init();
	dynamics.init();
	prism.init();
}





elements.init = function() {
	elements.languageSelector = document.getElementById("language-selector");
	elements.itemTypeSelector = document.getElementById("item-type-selector");
	elements.nameInput = document.getElementById("name-input");
	elements.initMethodSelector = document.getElementById("init-method-selector");
	elements.initBySizeWidget = document.getElementById("init-by-size-widget");
	elements.initLiteralWidget = document.getElementById("init-literal-widget");
	elements.sizeInput = document.getElementById("size-input");
	elements.literalValuesInput = document.getElementById("literal-values-input");
	elements.creationCode = document.getElementById("creation-code");
	elements.resetToInitButton = document.getElementById("reset-to-init-button");
	elements.stickyArrayDisplayBlockSpaceHolder = document.getElementById("sticky-array-display-block-space-holder");
	elements.stickyArrayDisplayBlock = document.getElementById("sticky-array-display-block");
	elements.arrayDisplayTable = document.getElementById("array-display-table");
	elements.readItemIndexInput = document.getElementById("read-item-index-input");
	elements.readValueButton = document.getElementById("read-value-button");
	elements.readItemValueDisplay = document.getElementById("read-item-value-display");
	elements.readCode = document.getElementById("read-code");
	elements.setItemIndexInput = document.getElementById("set-item-index-input");
	elements.setItemValueInput = document.getElementById("set-item-value-input");
	elements.setValueButton = document.getElementById("set-value-button");
	elements.setCode = document.getElementById("set-code");
}





tool.exampleLiteralValuesByType = {
	"int": "1,1,2,3,5,8",
	"double": "3.141,2.718,1.618,4.669",
	"str": "\"Aidan\",\"Dan\",\"Thomas\",\"Matt\"",
	"bool": "true,false,true,false"
}

tool.defaultValuesByType = {
	"int": "0",
	"double": "0.0",
	"str": "",
	"bool": "false"
}

tool.array = [];

tool.init = function() {
	tool.reinitArray(true);
}

tool.getLanguage = function() { return elements.languageSelector.value; }

tool.getItemType = function() { return elements.itemTypeSelector.value; }

tool.getName = function() { return elements.nameInput.value; }

tool.getInitMethod = function() { return elements.initMethodSelector.value; }

tool.getSize = function() {
	switch(tool.getInitMethod()) {
		case "by-size": return elements.sizeInput.value;
		default: return null;
	}
}

tool.getLiteralValues = function() {
	switch(tool.getInitMethod()) {
		case "by-size": return null;
		case "literal": 
			var split = elements.literalValuesInput.value.split(",");
			return (split[0] !== "") ? split : [];
	}
}

tool.reinitArrayBySize = function(isThorough) {
	if(isThorough) {
		tool.array = [];
	}
	var newSize = tool.getSize();
	var oldSize = tool.array.length;
	var defaultValue = tool.defaultValuesByType[tool.getItemType()];
	if(newSize > oldSize) {
		for(var index = oldSize; index < newSize; index++) {
			tool.array[index] = defaultValue;
		}
	} else if(newSize < oldSize) {
		tool.array.splice(newSize, oldSize - newSize);
	}
}

tool.reinitArrayByLiteralValues = function() {
	tool.array = tool.getLiteralValues();
}

tool.reinitArray = function(bySizeIsThorough) {
	switch(tool.getInitMethod()) {
		case "by-size":
			tool.reinitArrayBySize(bySizeIsThorough);
			break;
		case "literal":
			tool.reinitArrayByLiteralValues();
			break;
	}
}

tool.setArrayItem = function() {
	var index = elements.setItemIndexInput.value;
	var value = elements.setItemValueInput.value;
	if(!isNaN(index) && Number.isInteger(parseInt(index))) {
		if(index < 0) {
			alert("The index cannot be negative.");
		} else if(index >= tool.array.length) {
			alert("The index specified does not exist (the array is not long enough).");
		} else {
			tool.array[index] = value;
		}
	} else {
		alert("The index specified is not an integer.");
	}
}





dynamics.init = function() {
	dynamics.createEventListeners();
	dynamics.updateInitMethodWidgets();
	dynamics.updateCreationCode();
	dynamics.updateArrayDisplay();
	dynamics.updateReadCode();
	dynamics.updateSetCode();
}

dynamics.createEventListeners = function() {
	window.onscroll = dynamics.listeners.windowScrollChange;
	elements.languageSelector.onchange = dynamics.listeners.languageSelectorChange;
	elements.itemTypeSelector.onchange = dynamics.listeners.itemTypeSelectorChange;
	elements.nameInput.onchange = dynamics.listeners.nameInputChange;
	elements.initMethodSelector.onchange = dynamics.listeners.initMethodSelectorChange;
	elements.sizeInput.onchange = dynamics.listeners.sizeInputChange;
	elements.literalValuesInput.onchange = dynamics.listeners.literalValuesInputChange;
	elements.resetToInitButton.onclick = dynamics.listeners.resetToInitButtonAction;
	elements.readItemIndexInput.onchange = dynamics.listeners.readItemIndexInputChange;
	elements.readValueButton.onclick = dynamics.listeners.readValueButtonAction;
	elements.setItemIndexInput.onchange = dynamics.listeners.setItemIndexInputChange;
	elements.setItemValueInput.onchange = dynamics.listeners.setItemValueInputChange;
	elements.setValueButton.onclick = dynamics.listeners.setValueButtonAction;
}

dynamics.listeners.windowScrollChange = function() {
	dynamics.updateStickyArrayDisplayBlock();
}

dynamics.listeners.languageSelectorChange = function() {
	dynamics.updateCreationCode();
	dynamics.updateReadCode();
	dynamics.updateSetCode();
}

dynamics.listeners.itemTypeSelectorChange = function() {
	dynamics.updateExampleLiteralValues();
	dynamics.updateCreationCode();
	tool.reinitArray(true);
	dynamics.updateArrayDisplay();
	dynamics.updateReadCode();
	dynamics.updateSetCode();
}
dynamics.listeners.nameInputChange = function() {
	dynamics.updateCreationCode();
	dynamics.updateReadCode();
	dynamics.updateSetCode();
}
dynamics.listeners.initMethodSelectorChange = function() {
	dynamics.updateInitMethodWidgets();
	dynamics.updateExampleLiteralValues();
	dynamics.updateCreationCode();
	tool.reinitArray(true);
	dynamics.updateArrayDisplay();
}
dynamics.listeners.sizeInputChange = function() {
	if(dynamics.checkForInvalidSize()) {
		elements.sizeInput.value = 0;
	}
	dynamics.updateCreationCode();
	tool.reinitArray(false);
	dynamics.updateArrayDisplay();
}
dynamics.listeners.literalValuesInputChange = function() {
	dynamics.updateCreationCode();
	tool.reinitArray(true);
	dynamics.updateArrayDisplay();
}
dynamics.listeners.resetToInitButtonAction = function() {
	tool.reinitArray(true);
	dynamics.updateArrayDisplay();
}
dynamics.listeners.readItemIndexInputChange = function() {
	dynamics.updateReadCode();
}
dynamics.listeners.readValueButtonAction = function() {
	dynamics.updateReadItemValueDisplay();
	dynamics.highlightArrayItem(elements.readItemIndexInput.value, 1000);
}
dynamics.listeners.setItemIndexInputChange = function() {
	dynamics.updateSetCode();
}
dynamics.listeners.setItemValueInputChange = function() {
	dynamics.updateSetCode();
}
dynamics.listeners.setValueButtonAction = function() {
	tool.setArrayItem();
	dynamics.updateArrayDisplay();
	dynamics.highlightArrayItem(elements.setItemIndexInput.value, 1000);
}

dynamics.checkForInvalidSize = function() {
	var size = elements.sizeInput.value;
	if(!isNaN(size) && Number.isInteger(parseInt(size))) {
		if(size < 0) {
			alert("The array size you set must be greater than or equal to 0.");
		} else if(size > 256) {
			alert("Arrays can be as large as 2,147,483,647 items long on a 32-bit machine, however this tool only allows up to 256 because I don't want your computer to explode. Sorry!");
		} else {
			return false;
		}
	} else {
		alert("The array size you set must be an integer.");
	}
	return true;
}

dynamics.updateArrayDisplay = function() {
	var rows = elements.arrayDisplayTable.getElementsByTagName("tr");
	var headerRow = rows[0];
	var valueRow = rows[1];
	if(tool.array.length === 0) {
		headerRow.innerHTML = "<th>Array is empty</th>";
		valueRow.innerHTML = "";
	} else {
		headerRow.innerHTML = "<th>Index:</th>";
		valueRow.innerHTML = "<th>Value:</th>";
		tool.array.forEach(function(value, index) {
			headerRow.innerHTML += "<th>" + index + "</th>";
			valueRow.innerHTML += "<td>" + value + "</td>";
		});
	}
}

dynamics.highlightArrayItem = function(index, duration) {
	if(tool.array.length > 0) {
		var rows = elements.arrayDisplayTable.getElementsByTagName("tr");
		var headerRow = rows[0];
		var valueRow = rows[1];
		var elementIndex = parseInt(index) + 1;
		var indexCell = headerRow.children[elementIndex];
		var valueCell = valueRow.children[elementIndex];
		indexCell.classList.add("highlighted-cell");
		valueCell.classList.add("highlighted-cell");
		setTimeout(function() {
			indexCell.classList.remove("highlighted-cell");
			valueCell.classList.remove("highlighted-cell");
		}, duration);
	}
}

dynamics.updateInitMethodWidgets = function() {
	switch(tool.getInitMethod()) {
		case "by-size":
			elements.initBySizeWidget.style.display = "inline-block";
			elements.initLiteralWidget.style.display = "none";
			break;
		case "literal":
			elements.initBySizeWidget.style.display = "none";
			elements.initLiteralWidget.style.display = "inline-block";
			if(tool.getLiteralValues().length === 0) {
				dynamics.updateExampleLiteralValues();
			}
			break;
	}
}

dynamics.updateExampleLiteralValues = function() {
	if(tool.getInitMethod() === "literal") {
		elements.literalValuesInput.value = tool.exampleLiteralValuesByType[tool.getItemType()];
	}
}

dynamics.updateCreationCode = function() {
	var newCode = lang.create1D(tool.getLanguage(), tool.getItemType(), tool.getName(), tool.getSize(), tool.getLiteralValues());
	prism.modifyCodeDisplay(elements.creationCode, tool.getLanguage(), newCode);
}

dynamics.updateReadItemValueDisplay = function() {
	var index = elements.readItemIndexInput.value;
	if(!isNaN(index) && Number.isInteger(parseInt(index))) {
		if(index < 0) {
			alert("The index cannot be negative.");
		} else if(index >= tool.array.length) {
			alert("The index specified does not exist (the array is not long enough).");
		} else {
			elements.readItemValueDisplay.innerHTML = tool.array[index];
		}
	} else {
		alert("The index specified is not an integer.");
	}
	
}

dynamics.updateReadCode = function() {
	var newCode = lang.read1D(tool.getLanguage(), tool.getItemType(), tool.getName(), elements.readItemIndexInput.value);
	prism.modifyCodeDisplay(elements.readCode, tool.getLanguage(), newCode);
}

dynamics.updateSetCode = function() {
	var newCode = lang.set1D(tool.getLanguage(), tool.getItemType(), tool.getName(), elements.setItemIndexInput.value, elements.setItemValueInput.value);
	prism.modifyCodeDisplay(elements.setCode, tool.getLanguage(), newCode);
}

dynamics.updateStickyArrayDisplayBlock = function() {
	if(window.pageYOffset > elements.stickyArrayDisplayBlockSpaceHolder.offsetTop) {
		elements.stickyArrayDisplayBlockSpaceHolder.style.height = (elements.stickyArrayDisplayBlock.offsetHeight - 30) + "px";
		elements.stickyArrayDisplayBlock.classList.add("stuck");
	} else {
		elements.stickyArrayDisplayBlockSpaceHolder.style.height = "inherit";
		elements.stickyArrayDisplayBlock.classList.remove("stuck");
	}
}





prism.init = function() {
	Prism.manual = true;
}

prism.modifyCodeDisplay = function(element, language, newCode) {
	element.innerHTML = newCode;
	prism.modifyElementLanguageClass(element, language);
	Prism.highlightElement(element, null, null);
}

prism.modifyElementLanguageClass = function(element, language) {
	element.classList.forEach(function(elementClass) {
		if(elementClass.startsWith("language-"));
		element.classList.remove(elementClass);
	});
	element.classList.add("language-" + language);
}





onLoad();