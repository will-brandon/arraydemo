   // // // // // // //
  // Will Brandon   //
 // 5/24/2021      //
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
	elements.rowCountInput = document.getElementById("row-count-input");
	elements.columnCountInput = document.getElementById("column-count-input");
	elements.creationCode = document.getElementById("creation-code");
	elements.resetToInitButton = document.getElementById("reset-to-init-button");
	elements.stickyArrayDisplayBlockSpaceHolder = document.getElementById("sticky-array-display-block-space-holder");
	elements.stickyArrayDisplayBlock = document.getElementById("sticky-array-display-block");
	elements.arrayDisplayTable = document.getElementById("array-display-table");
	elements.readItemRowIndexInput = document.getElementById("read-item-row-index-input");
	elements.readItemColumnIndexInput = document.getElementById("read-item-column-index-input");
	elements.readValueButton = document.getElementById("read-value-button");
	elements.readItemValueDisplay = document.getElementById("read-item-value-display");
	elements.readCode = document.getElementById("read-code");
	elements.setItemRowIndexInput = document.getElementById("set-item-row-index-input");
	elements.setItemColumnIndexInput = document.getElementById("set-item-column-index-input");
	elements.setItemValueInput = document.getElementById("set-item-value-input");
	elements.setValueButton = document.getElementById("set-value-button");
	elements.setCode = document.getElementById("set-code");
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

tool.getRowCount = function() { return elements.rowCountInput.value; }

tool.getColumnCount = function() { return elements.columnCountInput.value; }

tool.reinitArray = function(isThorough) {
	if(isThorough) {
		tool.array = [];
	}
	var newRowCount = tool.getRowCount();
	var newColumnCount = tool.getColumnCount();
	var oldRowCount = tool.array.length;
	var defaultValue = tool.defaultValuesByType[tool.getItemType()];
	if(newRowCount > oldRowCount) {
		for(var rowIndex = oldRowCount; rowIndex < newRowCount; rowIndex++) {
			tool.array[rowIndex] = [];
			for(var columnIndex = 0; columnIndex < newColumnCount; columnIndex++) {
				tool.array[rowIndex][columnIndex] = defaultValue;
			}
		}
	} else if(newRowCount < oldRowCount) {
		tool.array.splice(newRowCount, oldRowCount - newRowCount);
	}
	for(var rowIndex = 0; rowIndex < newRowCount; rowIndex++) {
		var oldColumnCount = tool.array[rowIndex].length;
		if(newColumnCount > oldColumnCount) {
			for(var columnIndex = oldColumnCount; columnIndex < newColumnCount; columnIndex++) {
				tool.array[rowIndex][columnIndex] = defaultValue;
			}
		} else if(newColumnCount < oldColumnCount) {
			tool.array[rowIndex].splice(newColumnCount, oldColumnCount - newColumnCount);
		}
	}
}

tool.setArrayItem = function() {
	var rowIndex = elements.setItemRowIndexInput.value;
	var columnIndex = elements.setItemColumnIndexInput.value;
	var value = elements.setItemValueInput.value;
	if(isNaN(rowIndex) || !Number.isInteger(parseInt(rowIndex))) {
		alert("The row-index specified is not an integer.");
		elements.setItemRowIndexInput.value = 0;
	} else if(isNaN(columnIndex) || !Number.isInteger(parseInt(columnIndex))) {
		alert("The column-index specified is not an integer.");
		elements.setItemColumnIndexInput.value = 0;
		dynamics.updateSetCode();
	} else if(rowIndex < 0) {
		alert("The row-index cannot be negative.");
		elements.setItemRowIndexInput.value = 0;
		dynamics.updateSetCode();
	} else if(columnIndex < 0) {
		alert("The column-index cannot be negative.");
		elements.setItemColumnIndexInput.value = 0;
		dynamics.updateSetCode();
	} else if(rowIndex >= tool.array.length) {
		alert("The row-index specified does not exist (the array does not have that many rows).");
		elements.setItemRowIndexInput.value = 0;
		dynamics.updateSetCode();
	} else if((tool.array.length > 0) ? (columnIndex >= tool.array[0].length) : (columnIndex > 0)) {
		alert("The column-index specified does not exist (the array does not have that many columns).");
		elements.setItemColumnIndexInput.value = 0;
		dynamics.updateSetCode();
	} else {
		tool.array[rowIndex][columnIndex] = value;
		dynamics.updateArrayDisplay();
		dynamics.highlightArrayItem(rowIndex, columnIndex, 1000);
	}
}





dynamics.init = function() {
	dynamics.createEventListeners();
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
	elements.rowCountInput.onchange = dynamics.listeners.rowCountInputChange;
	elements.columnCountInput.onchange = dynamics.listeners.columnCountInputChange;
	elements.resetToInitButton.onclick = dynamics.listeners.resetToInitButtonAction;
	elements.readItemRowIndexInput.onchange = dynamics.listeners.readItemRowIndexInputChange;
	elements.readItemColumnIndexInput.onchange = dynamics.listeners.readItemColumnIndexInputChange;
	elements.readValueButton.onclick = dynamics.listeners.readValueButtonAction;
	elements.setItemRowIndexInput.onchange = dynamics.listeners.setItemRowIndexInputChange;
	elements.setItemColumnIndexInput.onchange = dynamics.listeners.setItemColumnIndexInputChange;
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
dynamics.listeners.rowCountInputChange = function() {
	if(dynamics.checkForInvalidRowCount()) {
		elements.rowCountInput.value = 0;
	}
	dynamics.updateCreationCode();
	tool.reinitArray(false);
	dynamics.updateArrayDisplay();
}
dynamics.listeners.columnCountInputChange = function() {
	if(dynamics.checkForInvalidColumnCount()) {
		elements.columnCountInput.value = 0;
	}
	dynamics.updateCreationCode();
	tool.reinitArray(false);
	dynamics.updateArrayDisplay();
}
dynamics.listeners.resetToInitButtonAction = function() {
	tool.reinitArray(true);
	dynamics.updateArrayDisplay();
}
dynamics.listeners.readItemRowIndexInputChange = function() {
	dynamics.updateReadCode();
}
dynamics.listeners.readItemColumnIndexInputChange = function() {
	dynamics.updateReadCode();
}
dynamics.listeners.readValueButtonAction = function() {
	dynamics.updateReadItemValueDisplay();
}
dynamics.listeners.setItemRowIndexInputChange = function() {
	dynamics.updateSetCode();
}
dynamics.listeners.setItemColumnIndexInputChange = function() {
	dynamics.updateSetCode();
}
dynamics.listeners.setItemValueInputChange = function() {
	dynamics.updateSetCode();
}
dynamics.listeners.setValueButtonAction = function() {
	tool.setArrayItem();
}

dynamics.checkForInvalidRowCount = function() {
	var rowCount = elements.rowCountInput.value;
	if(!isNaN(rowCount) && Number.isInteger(parseInt(rowCount))) {
		if(rowCount < 0) {
			alert("The 2D array row count you set must be greater than or equal to 0.");
		} else if(rowCount > 32) {
			alert("2D Arrays can be as large as 2,147,483,647 by 2,147,483,647 items on a 32-bit machine, however this tool only allows up to 32x32 because I don't want your computer to explode. Sorry!");
		} else {
			return false;
		}
	} else {
		alert("The 2D array row count you set must be an integer.");
	}
	return true;
}

dynamics.checkForInvalidColumnCount = function() {
	var columnCount = elements.columnCountInput.value;
	if(!isNaN(columnCount) && Number.isInteger(parseInt(columnCount))) {
		if(columnCount < 0) {
			alert("The 2D array column count you set must be greater than or equal to 0.");
		} else if(columnCount > 32) {
			alert("2D Arrays can be as large as 2,147,483,647 by 2,147,483,647 items on a 32-bit machine, however this tool only allows up to 32x32 because I don't want your computer to explode. Sorry!");
		} else {
			return false;
		}
	} else {
		alert("The 2D array column count you set must be an integer.");
	}
	return true;
}

dynamics.updateArrayDisplay = function() {
	elements.arrayDisplayTable.innerHTML = "<tr><th>Array is empty</th><tr/>";
	if(tool.array.length > 0 && tool.array[0].length > 0) {
		var headerRow = elements.arrayDisplayTable.getElementsByTagName("tr")[0];
		headerRow.innerHTML = "<th></th>";
		tool.array[0].forEach(function(columnValue, columnIndex) {
			headerRow.innerHTML += "<th>" + columnIndex + "</th>";
		});
		tool.array.forEach(function(rowValues, rowIndex) {
			var rowHTML = "<tr><th>" + rowIndex + "</th>";
			tool.array[rowIndex].forEach(function(columnValue, columnIndex) {
				rowHTML += "<td>" + columnValue + "</td>";
			});
			rowHTML += "</tr>";
			elements.arrayDisplayTable.innerHTML += rowHTML;
		});
		var rows = elements.arrayDisplayTable.getElementsByTagName("tr");
		// Sometimes there are phantom rows added by the document so that tables have more than one row.
		for(var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
			var row = rows[rowIndex];
			if(row.innerHTML === "") {
				row.remove();
			}
		};
	}
}

dynamics.highlightArrayItem = function(rowIndex, columnIndex, duration) {
	if(tool.array.length > 0 && tool.array[0].length > 0) {
		var rows = elements.arrayDisplayTable.getElementsByTagName("tr");
		var headerRow = rows[0];
		var rowElementIndex = parseInt(rowIndex) + 1;
		var columnElementIndex = parseInt(columnIndex) + 1;
		var rowIndexCell = rows[rowElementIndex].children[0];
		var columnIndexCell = headerRow.children[columnElementIndex];
		var valueCell = rows[rowElementIndex].children[columnElementIndex];
		rowIndexCell.classList.add("highlighted-cell");
		columnIndexCell.classList.add("highlighted-cell");
		valueCell.classList.add("highlighted-cell");
		setTimeout(function() {
			rowIndexCell.classList.remove("highlighted-cell");
			columnIndexCell.classList.remove("highlighted-cell");
			valueCell.classList.remove("highlighted-cell");
		}, duration);
	}
}

dynamics.updateCreationCode = function() {
	var newCode = lang.create2D(tool.getLanguage(), tool.getItemType(), tool.getName(), tool.getRowCount(), tool.getColumnCount());
	prism.modifyCodeDisplay(elements.creationCode, tool.getLanguage(), newCode);
}

dynamics.updateReadItemValueDisplay = function() {
	var rowIndex = elements.readItemRowIndexInput.value;
	var columnIndex = elements.readItemColumnIndexInput.value;
	if(isNaN(rowIndex) || !Number.isInteger(parseInt(rowIndex))) {
		alert("The row-index specified is not an integer.");
		elements.readItemRowIndexInput.value = 0;
	} else if(isNaN(columnIndex) || !Number.isInteger(parseInt(columnIndex))) {
		alert("The column-index specified is not an integer.");
		elements.readItemColumnIndexInput.value = 0;
		dynamics.updateReadCode();
	} else if(rowIndex < 0) {
		alert("The row-index cannot be negative.");
		elements.readItemRowIndexInput.value = 0;
		dynamics.updateReadCode();
	} else if(columnIndex < 0) {
		alert("The column-index cannot be negative.");
		elements.readItemColumnIndexInput.value = 0;
		dynamics.updateReadCode();
	} else if(rowIndex >= tool.array.length) {
		alert("The row-index specified does not exist (the array does not have that many rows).");
		elements.readItemRowIndexInput.value = 0;
		dynamics.updateReadCode();
	} else if((tool.array.length > 0) ? (columnIndex >= tool.array[0].length) : (columnIndex > 0)) {
		alert("The column-index specified does not exist (the array does not have that many columns).");
		elements.readItemColumnIndexInput.value = 0;
		dynamics.updateReadCode();
	} else {
		elements.readItemValueDisplay.innerHTML = tool.array[rowIndex][columnIndex];
		dynamics.highlightArrayItem(rowIndex, columnIndex, 1000);
	}
}

dynamics.updateReadCode = function() {
	var newCode = lang.read2D(tool.getLanguage(), tool.getItemType(), tool.getName(), elements.readItemRowIndexInput.value, elements.readItemColumnIndexInput.value);
	prism.modifyCodeDisplay(elements.readCode, tool.getLanguage(), newCode);
}

dynamics.updateSetCode = function() {
	var newCode = lang.set2D(tool.getLanguage(), tool.getItemType(), tool.getName(), elements.setItemRowIndexInput.value, elements.setItemColumnIndexInput.value, elements.setItemValueInput.value);
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