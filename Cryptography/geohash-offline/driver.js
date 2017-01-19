$(document).ready(function()
{
	var $dateIn = $('input[name=date]');
	var $dowIn = $('input[name=DJIA]');
	
	//initialize date field if empty
	if($dateIn.val() === '')
	{
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1; // because JS is on crack
		if(month < 10)
			month = '0'+month;
		var date = now.getDate();
		if(date < 10)
			date = '0' + date;
		
		$dateIn.val(year + '-' + month + '-' + date);
	}

	var $latOut = $('#output > .lat');
	var $longOut = $('#output > .long');
	
	$('button[name=do][value=calc]').click(function(ev)
	{
		var hash = hex_md5($dateIn.val() + '-' + $dowIn.val());
		$latOut.text(FracHex2Dec('.'+hash.substr(0, 16)));
		$longOut.text(FracHex2Dec('.'+hash.substr(16, 16)));
	});
});
