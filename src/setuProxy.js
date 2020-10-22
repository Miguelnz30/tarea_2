const proxy = require("http-proxy-middleware");

module.exports = function(app){
    app.use(
        proxy("/usuarios",{
            target : "http://localhost:3050",
            secure : false,
            changeOrigin : true,

        })

    );

};