/*Given a table of inputs, construct an array of objects where each object has
 * as properties the names of the inputs of a row of the table, and each property's value is the value
 * of the associated input.*/

$.fn.serializeRowToObjectArray = function()
{
    var ro = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (ro[this.name] !== undefined) {
            if (!ro[this.name].push) {
                ro[this.name] = [ro[this.name]];
            }
            ro[this.name].push(this.value || '');
        } else {
            ro[this.name] = this.value || '';
        }
    });
    return ro;
};
var counter = 1;
//TODO: col is duplication of thead in views/prefect.html
var col = ["HouseName","PointCategory","PointSubcategory","BaselineValue","Modifier"]

var categories = {
    "Bring provisions" : {
	"Small snack" : 10,
	"Alcohol" : 15,
    	"Big snack" : 20},
    "Win a game" : {
	"HP dice game" : 15,
	"HP Pong w/o snitch" : 20,
	"Codenames/Patchwork/Resistance" : 25,
    	"Long game" : 40,
    	"HP Pong with snitch" : 50},
    "Get drunk" : {
	"Take a shot" : 10,
	"Brew a potion" : 15},
    "Engage in costumed antics" : {
	"Wear a costume" : 15,
	"Re-enact a scene (2 mins)": 30,
	"Win costume contest" : 50}
};

var teamNames;

var onSubcategoryChange = function() {
    var thisRow = $(this).closest('tr');
    var baselineValInput = $('input[name="'+col[3]+'"]',thisRow);
    var catSelect = $('.category',thisRow);
    baselineValInput.val(categories[catSelect.val()][$(this).val()]);
};

var onCategoryChange = function() {
    var thisRow = $(this).closest('tr');
    var subCatCell = $('#cellSubcategory',thisRow);
    subCatCell.empty();
    var subCatSelect = makeSelect(col[2],Object.keys(categories[$(this).val()]));
    subCatCell.append(subCatSelect);
    $('#cellSubcategory select').change(onSubcategoryChange).change();
};

var makeSelect = function(selectName,selectItems) {
    var newSelect = document.createElement('select');
    newSelect.name=selectName;
    for (itemIdx in selectItems) {
	var name = selectItems[itemIdx];
	newSelect.add(new Option(name,name));
    }
    return newSelect;
};

var makeRow = function() {
    var newRow = $('<tr></tr>');
    $('<td>').append(makeSelect(col[0],teamNames)).appendTo(newRow);
    var catSelect = makeSelect(col[1],Object.keys(categories));
    catSelect.className += "category";
    $('<td>').append(catSelect).appendTo(newRow);
    var subCatCell = $('<td>');
    subCatCell.attr("id","cellSubcategory");
    subCatCell.appendTo(newRow);
    var baselineValInput = $('<input type="text" name="'+col[3]+'" readonly/>');
    baselineValInput.appendTo(newRow);
    $('<td><input type="text" name="'+col[4]+'"/></td>').appendTo(newRow);
    $('table.authors-list').append(newRow);
    $('.category',newRow).change(onCategoryChange).change();
};


$(document).ready(function() {
    $.get({
	url:'/house-names',
	success: function(res) {
	    teamNames=JSON.parse(res);
	    makeRow();
	}
    });

    jQuery('a.add-author').click(function(event){
	event.preventDefault();
	makeRow();
    });
    $('.submit').click(function(event) {
	var dataRow; 
	var data = [];
	$.each($('tbody tr'),function () {
	    dataRow = $('input,select',$(this)).serializeRowToObjectArray();
	    data.push(dataRow);
	});
	$.post('/prefect',{data:JSON.stringify(data)});
    });


});
