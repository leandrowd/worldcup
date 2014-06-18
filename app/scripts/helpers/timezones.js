define(['moment-timezone',  'text!bower_components/moment-timezone/moment-timezone.json'], function (moment, data) {
    moment.tz.add(JSON.parse(data));
	return moment;
});


