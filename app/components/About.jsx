var React = require('react');

var About = (props) => {
    return (
        <div>
            <h1 className="text-center">About</h1>

            <p>Sample React Weather Fetching Application. Build for the the The Complete
                React Web Developer Course.</p>
            <p>
                Here are some of the tools used:
            </p>
            <ul>
                <li>
                    <a href="https://facebook.github.io/react">React</a>
                    - The javascript framework uses.
                </li>
                <li>
                    <a href="http://openweathermap.org">Open Weather Map</a>
                    - Used to provide weather data.
                </li>

            </ul>
        </div>
    );
}

module.exports = About;
