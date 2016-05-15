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
var col = ["TeamName","PointCategory","PointSubcategory","Modifier"]
var makeRow = function() {
	var newRow = jQuery('<tr><td><input type="text" name="'+col[0]+'"/></td><td><input type="text" name="last_name"/></td><td>0</td><<td><input type="text" name="'+col[3]+'"/></tr>');
	jQuery('table.authors-list').append(newRow);
}
$(document).ready(function() {
    makeRow();
    var table = $('#dataTable').dataTable({
	paging: false,
	searching: false
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
