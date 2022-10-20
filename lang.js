var lang = {};

lang.typeNames = {"int": "integer", "double": "double", "str": "string", "bool": "boolean"}

lang.syntax = {
	"c": {
		type: {"int": "int", "double": "double", "str": "char*", "bool": "int"},
		stringFormatTypeSpecifiers: {"int": "%d", "double": "%f", "str": "%s", "bool": "%d"},
		create1D: function(itemType, name, size, literalValues) {
			var string = lang.syntax.c.type[itemType] + " " + name + "[";
			if(size != null) string += size + "];";
			else return string += "] = {" + literalValues.join(", ") + "};";
			return string;
		},
		read1D: function(itemType, name, index) {
			return "printf(\"" + lang.syntax.c.stringFormatTypeSpecifiers[itemType] + "\", " + name + "[" + index + "]);";
		},
		set1D: function(itemType, name, index, value) {
			return name + "[" + index + "] = " + value + ";";
		},
		create2D: function(itemType, name, rowCount, columnCount) {
			return lang.syntax.c.type[itemType] + " " + name + "[" + rowCount + "][" + columnCount + "];";
		},
		read2D: function(itemType, name, rowIndex, columnIndex) {
			return "printf(\"" + lang.syntax.c.stringFormatTypeSpecifiers[itemType] + "\", " + name + "[" + rowIndex + "][" + columnIndex + "]);";
		},
		set2D: function(itemType, name, rowIndex, columnIndex, value) {
			return name + "[" + rowIndex + "][" + columnIndex + "] = " + value + ";";
		}
	},
	"cs": {
		type: {"int": "int", "double": "double", "str": "string", "bool": "bool"},
		create1D: function(itemType, name, size, literalValues) {
			var string = lang.syntax.cs.type[itemType] + "[] " + name + " = new " + lang.syntax.cs.type[itemType] + "["
			if(size != null) string += size + "];";
			else string += "] {" + literalValues.join(", ") + "};";
			return string;
		},
		read1D: function(itemType, name, index) {
			return "Console.WriteLine(" + name + "[" + index + "]);";
		},
		set1D: function(itemType, name, index, value) {
			return name + "[" + index + "] = " + value + ";";
		},
		create2D: function(itemType, name, rowCount, columnCount) {
			return lang.syntax.cs.type[itemType] + "[,] " + name + " = new " + lang.syntax.cs.type[itemType] + "[" + rowCount + "][" + columnCount + "];";
		},
		read2D: function(itemType, name, rowIndex, columnIndex) {
			return "Console.WriteLine(" + name + "[" + rowIndex + "][" + columnIndex + "]);";
		},
		set2D: function(itemType, name, rowIndex, columnIndex, value) {
			return name + "[" + rowIndex + "][" + columnIndex + "] = " + value + ";";
		}
	},
	"cpp": {
		type: {"int": "int", "double": "double", "str": "char*", "bool": "bool"},
		create1D: function(itemType, name, size, literalValues) {
			var string = lang.syntax.cpp.type[itemType] + " " + name + "[";
			if(size != null) string += size + "];";
			else return string += "] = {" + literalValues.join(", ") + "};";
			return string;
		},
		read1D: function(itemType, name, index) {
			return "cout << " + name + "[" + index + "] << endl;";
		},
		set1D: function(itemType, name, index, value) {
			return name + "[" + index + "] = " + value + ";";
		},
		create2D: function(itemType, name, rowCount, columnCount) {
			return lang.syntax.c.type[itemType] + " " + name + "[" + rowCount + "][" + columnCount + "];";
		},
		read2D: function(itemType, name, rowIndex, columnIndex) {
			return "cout << " + name + "[" + rowIndex + "][" + columnIndex + "] << endl;";
		},
		set2D: function(itemType, name, rowIndex, columnIndex, value) {
			return name + "[" + rowIndex + "][" + columnIndex + "] = " + value + ";";
		}
	},
	"java": {
		type: {"int": "int", "double": "double", "str": "String", "bool": "boolean"},
		create1D: function(itemType, name, size, literalValues) {
			var string = lang.syntax.java.type[itemType] + "[] " + name + " = new " + lang.syntax.java.type[itemType] + "["
			if(size != null) string += size + "];";
			else string += "] {" + literalValues.join(", ") + "};";
			return string;
		},
		read1D: function(itemType, name, index) {
			return "System.out.println(" + name + "[" + index + "]);";
		},
		set1D: function(itemType, name, index, value) {
			return name + "[" + index + "] = " + value + ";";
		},
		create2D: function(itemType, name, rowCount, columnCount) {
			return lang.syntax.java.type[itemType] + "[][] " + name + " = new " + lang.syntax.java.type[itemType] + "[" + rowCount + "][" + columnCount + "];";
		},
		read2D: function(itemType, name, rowIndex, columnIndex) {
			return "System.out.println(" + name + "[" + rowIndex + "][" + columnIndex + "]);";
		},
		set2D: function(itemType, name, rowIndex, columnIndex, value) {
			return name + "[" + rowIndex + "][" + columnIndex + "] = " + value + ";";
		}
	},
	"js": {
		create1D: function(itemType, name, size, literalValues) {
			var string = "var " + name + " = ";
			if(size != null) string += "Array(" + size + ");";
			else return string += "[" + literalValues.join(", ") + "];";
			return string;
		},
		read1D: function(itemType, name, index) {
			return "console.log(" + name + "[" + index + "]);";
		},
		set1D: function(itemType, name, index, value) {
			return name + "[" + index + "] = " + value + ";";
		},
		create2D: function(itemType, name, rowCount, columnCount) {
			return "var " + name + " = Array(" + rowCount + ").fill(null).map(a => Array(" + columnCount + "));";
		},
		read2D: function(itemType, name, rowIndex, columnIndex) {
			return "console.log(" + name + "[" + rowIndex + "][" + columnIndex + "]);";
		},
		set2D: function(itemType, name, rowIndex, columnIndex, value) {
			return name + "[" + rowIndex + "][" + columnIndex + "] = " + value + ";";
		}
	},
	"objc": {
		type: {"int": "int", "double": "double", "str": "char*", "bool": "int"},
		stringFormatTypeSpecifiers: {"int": "%d", "double": "%f", "str": "%@", "bool": "%d"},
		create1D: function(itemType, name, size, literalValues) {
			var string = lang.syntax.objc.type[itemType] + " " + name + "[";
			if(size != null) string += size + "];";
			else return string += "] = {" + literalValues.join(", ") + "};";
			return string;
		},
		read1D: function(itemType, name, index) {
			return "NSLog(@\"" + lang.syntax.objc.stringFormatTypeSpecifiers[itemType] + "\", " + name + "[" + index + "]);";
		},
		set1D: function(itemType, name, index, value) {
			return name + "[" + index + "] = " + value + ";";
		},
		create2D: function(itemType, name, rowCount, columnCount) {
			return lang.syntax.c.type[itemType] + " " + name + "[" + rowCount + "][" + columnCount + "];";
		},
		read2D: function(itemType, name, rowIndex, columnIndex) {
			return "NSLog(@\"" + lang.syntax.objc.stringFormatTypeSpecifiers[itemType] + "\", " + name + "[" + rowIndex + "][" + columnIndex + "]);";
		},
		set2D: function(itemType, name, rowIndex, columnIndex, value) {
			return name + "[" + rowIndex + "][" + columnIndex + "] = " + value + ";";
		}
	},
	"php": {
		defaultValueStrings: {"int": "0", "double": "0.0", "str": "\"\"", "bool": "FALSE"},
		create1D: function(itemType, name, size, literalValues) {
			var string = "$" + name + " = ";
			if(size != null) string += "array_fill(0, " + size + ", " + lang.syntax.php.defaultValueStrings[itemType] + ");";
			else return string += "array(" + literalValues.join(", ") + ");";
			return string;
		},
		read1D: function(itemType, name, index) {
			return "echo $" + name + "[" + index + "];";
		},
		set1D: function(itemType, name, index, value) {
			return "$" + name + "[" + index + "] = " + value + ";";
		},
		create2D: function(itemType, name, rowCount, columnCount) {
			return "$" + name + " = array_map(function() { return array_fill(0, " + columnCount + ", NULL); }, array_fill(0, " + rowCount + ", NULL));";
		},
		read2D: function(itemType, name, rowIndex, columnIndex) {
			return "echo $" + name + "[" + rowIndex + "][" + columnIndex + "];";
		},
		set2D: function(itemType, name, rowIndex, columnIndex, value) {
			return "$" + name + "[" + rowIndex + "][" + columnIndex + "] = " + value + ";";
		}
	},
	"python": {
		create1D: function(itemType, name, size, literalValues) {
			var string = name + " = ";
			if(size != null) string += "[None] * " + size;
			else return string += "[" + literalValues.join(", ") + "]";
			return string;
		},
		read1D: function(itemType, name, index) {
			return "print(" + name + "[" + index + "])";
		},
		set1D: function(itemType, name, index, value) {
			return name + "[" + index + "] = " + value;
		},
		create2D: function(itemType, name, rowCount, columnCount) {
			return name + " = [[None] * " + columnCount + "] * " + rowCount;
		},
		read2D: function(itemType, name, rowIndex, columnIndex) {
			return "print(" + name + "[" + rowIndex + "][" + columnIndex + "])";
		},
		set2D: function(itemType, name, rowIndex, columnIndex, value) {
			return name + "[" + rowIndex + "][" + columnIndex + "] = " + value;
		}
	},
	"swift": {
		type: {"int": "Integer", "double": "Double", "str": "String", "bool": "Bool"},
		defaultValueStrings: {"int": "0", "double": "0.0", "str": "\"\"", "bool": "false"},
		create1D: function(itemType, name, size, literalValues) {
			var string = "var " + name + " = ";
			if(size != null) string += "[" + lang.syntax.swift.type[itemType] + "](repeating: " + lang.syntax.swift.defaultValueStrings[itemType] + ", count: " + size + ")";
			else return string += "[" + literalValues.join(", ") + "]";
			return string;
		},
		read1D: function(itemType, name, index) {
			return "print(" + name + "[" + index + "])";
		},
		set1D: function(itemType, name, index, value) {
			return name + "[" + index + "] = " + value;
		},
		create2D: function(itemType, name, rowCount, columnCount) {
			return "var " + name + " = Array(repeating: Array(repeating: " + lang.syntax.swift.defaultValueStrings[itemType] + ", count: " + columnCount + "), count: " + rowCount + ")";
		},
		read2D: function(itemType, name, rowIndex, columnIndex) {
			return "print(" + name + "[" + rowIndex + "][" + columnIndex + "])";
		},
		set2D: function(itemType, name, rowIndex, columnIndex, value) {
			return name + "[" + rowIndex + "][" + columnIndex + "] = " + value;
		}
	}
};

lang.create1D = function(language, itemType, name, size, literalValues) {
	return lang.syntax[language].create1D(itemType, name, size, literalValues);
}

lang.read1D = function(language, itemType, name, index) {
	return lang.syntax[language].read1D(itemType, name, index);
}

lang.set1D = function(language, itemType, name, index, value) {
	return lang.syntax[language].set1D(itemType, name, index, value);
}

lang.create2D = function(language, itemType, name, rowCount, columnCount) {
	return lang.syntax[language].create2D(itemType, name, rowCount, columnCount);
}

lang.read2D = function(language, itemType, name, rowIndex, columnIndex) {
	return lang.syntax[language].read2D(itemType, name, rowIndex, columnIndex);
}

lang.set2D = function(language, itemType, name, rowIndex, columnIndex, value) {
	return lang.syntax[language].set2D(itemType, name, rowIndex, columnIndex, value);
}