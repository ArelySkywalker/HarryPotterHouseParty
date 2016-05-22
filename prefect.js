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
var col = ["TeamName","PointCategory","PointSubcategory","Modifier"]
var teamNames;
var makeRow = function() {
    var newRow = $('<tr></tr>');

    //$('table.authors-list').find('tbody').append('<tr>');
    //var newRow=$('tr').get(-1);
    //var teamNameCell = newRow.append('<td>');
    var teamNameCell = $('<td>');
    var teamNameSelect = document.createElement('select');
    teamNameSelect.name=col[0];
    for (teamNameIdx in teamNames) {
	var name = teamNames[teamNameIdx];
	teamNameSelect.add(new Option(name,name));
    }
    teamNameCell.append(teamNameSelect);
    teamNameCell.appendTo(newRow);
    $('<td><input type="text" name="last_name"/></td><td>0</td><<td><input type="text" name="'+col[3]+'"/>').appendTo(newRow);
    $('table.authors-list').append(newRow);
    //teamNameCell.appendChild(teamNameSelect);
    ////make category cell
    //teamNameCell = newRow.append($('<td>'));
    ////make subcategory cell
    //teamNameCell = newRow.append($('<td>'));
    ////make modifier cell
    //teamNameCell = newRow.append($('<td>'));

}
$(document).ready(function() {
    $.get({
	url:'/team-names',
	success: function(res) {
	    teamNames=JSON.parse(res);
	    makeRow();
	    //var table = $('#dataTable').dataTable({
		//paging: false,
		//searching: false
	    //});
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
