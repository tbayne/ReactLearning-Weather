var React = require('react');
var WeatherMsg = require('WeatherMsg');
var WeatherForm = require('WeatherForm');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
    getDefaultProps: function () {
        return {name: 'React', msg: 'Please enter a city name'};
    },

    getInitialState: function () {
        return {isLoading: false, errorState: false}
    },

    handleSearch: function (location) {
        var that = this;
        this.setState({isLoading: true});
        openWeatherMap
            .getTemp(location)
            .then(function (temp) {
                that.setState({location: location, temp: temp, isLoading: false, errorState: false})
            }, function (errorMessage) {
                that.setState({isLoading: false, errorState: true});
                alert(errorMessage)
            })
    },

    render: function () {
        var {isLoading, temp, location, errorState} = this.state;
        function renderMessage() {
            if (isLoading) {
                return <h3 className="text-center">Fetching weather...</h3>;
            } else if (errorState) {
                return <h3>Cound not find your city!</h3>;
            } else {
                if (temp && location) {
                    return <WeatherMsg location={location} temp={temp}/>;
                }
            }
        }
        return (
            <div>
                <h1 className="text-center">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/> {renderMessage()}
            </div>
        );
    }
});

module.exports = Weather;