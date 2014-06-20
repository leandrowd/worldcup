define(['handlebars', 'moment-timezone'], function ( Handlebars, moment ) {
  	function formatDate(context, block) {
  		var format = block.hash.format || "MMM DD, YYYY hh:mm:ss A",
  			timezone = block.hash.timezone || "GMT";
		return moment(context).tz(timezone).format(format);

	}
  	Handlebars.registerHelper('dateFormat', formatDate);
  	return formatDate;
});


