module.exports = {
    entry: './app/app.jsx',
    output: {
        path: __dirname,

        filename: './public/bundle.js'
    },
    resolve: {

        root: __dirname,
        alias: {
            Main: "app/components/Main.jsx",
            Nav: "app/components/Nav.jsx",
            Weather: "app/components/Weather.jsx",
            About: "app/components/About.jsx",
            Examples: "app/components/Examples.jsx",
            WeatherForm: "app/components/WeatherForm.jsx",
            WeatherMsg: "app/components/WeatherMsg.jsx",
            openWeatherMap: "app/api/openWeatherMap.jsx"
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2017', 'stage-2']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.json$/,
                loader: 'json'
            }

        ]
    },
    devtool: 'inline-source-map'

};