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

    componentWillReceiveProps: function (newProps) {
        var location = newProps.location.query.location; // Get the query parameter 'location', from react-router
        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = '#/';
        }
    },
    componentDidMount: function () {
        var location = this.props.location.query.location; // Get the query parameter 'location', from react-router
        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = '#/';
        }
    },
    handleSearch: function (location) {
        var that = this;
        this.setState({isLoading: true, temp: undefined, errorMessage: undefined});
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
                return (<ErrorModal message={errorMessage}/>);
            }
        }
        return (
            <div>
                <h1 className="text-center page-title">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/> {renderMessage()}
                {renderError()}
            </div>
        );
    }
});

module.exports = Weather;