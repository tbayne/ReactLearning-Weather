var axios = require('axios');

const OPEN_WEATHER_MAP_URL = "http://api.openweathermap.org/data/2.5/weather?appid=8a59c1da2da079f39405e2d3546" +
        "d2485&units=imperial"

module.exports = {
    getTemp: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
        debugger;
        return axios
            .get(requestUrl)
            .then(function (response) {
                if (response.data.cod && response.data.message) {
                    throw new Error(res.data.message);

                } else {
                    return response.data.main.temp;
                }

            }, function (response) {
                throw new Error(response.data.message);
            });
    }

}