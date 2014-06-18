//  format an ISO date using Moment.js
//  http://momentjs.com/
//  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
//  usage: {{dateFormat creation_date format="MMMM YYYY"}}
//
//
define(['handlebars', 'moment-timezone'], function ( Handlebars, moment ) {
  	function formatDate(context, block) {
  		var format = block.hash.format || "MMM DD, YYYY hh:mm:ss A",
  			timezone = block.hash.timezone || "GMT";
		console.log(moment.tz);
		return moment(context).tz(timezone).format(format); //had to remove Date(context)

	}
  	Handlebars.registerHelper('dateFormat', formatDate);
  	return formatDate;
});


