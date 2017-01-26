var React = require('react');
var WeatherMsg = require('WeatherMsg');
var WeatherForm = require('WeatherForm');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({
    getDefaultProps: function () {
        return {name: 'React', msg: 'Please enter a city name'};
    },

    getInitialState: function () {
        return {isLoading: false, errorMessage: undefined, temp: undefined}
    },

    handleSearch: function (location) {
        var that = this;
        this.setState({isLoading: true});
        openWeatherMap
            .getTemp(location)
            .then(function (temp) {
                that.setState({location: location, temp: temp, isLoading: false, errorMessage: undefined})
            }, function (e) {
                that.setState({isLoading: false, errorMessage: e.message});

            });
    },

    render: function () {
        var {isLoading, temp, location, errorMessage} = this.state;
        function renderMessage() {
            if (isLoading) {
                return <h3 className="text-center">Fetching weather...</h3>;
            } else if (temp && location) {
                return <WeatherMsg location={location} temp={temp}/>;
            }
        }
        function renderError() {
            if (typeof errorMessage === 'string') {
                return (<ErrorModal/>);
            }
        }
        return (
            <div>
                <h1 className="text-center">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/> {renderMessage()}
                {renderError()}
            </div>
        );
    }
});

module.exports = Weather;