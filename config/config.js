 /**
 * Created by Muhammad Faizan on 07-May-16.
 */

 "use strict";
 const convict = require('convict');

 let config = convict({
     env: {
         doc: "The applicaton environment.",
         format: ["production", "development", "test"],
         default: "development",
         env: "NODE_ENV"
     },
     server: {
         ip: {
             doc: "IP address to bind",
             format: 'ipaddress',
             default: '0.0.0.0'
         },
         port: {
             doc: "port to bind",
             format: 'port',
             default: 8080
         }
     },
     database: {
         host: {
             doc: "Database host name/IP",
             format: String,
             default: 'testing'
         },
         name: {
             doc: "Database name",
             format: String,
             default: 'users'
         }
     },
     "tokbox": {
         "API_KEY": {
             doc: "API key given by tokbox",
             format: String,
             default: "INSERT YOUR TOKBOX API KEY"
         },
         "API_SECRET": {
             doc: "API secret given by tokbox",
             format: String,
             default: "INSERT YOUR TOKBOX API SECRET"
         }
     }
 });

 // Load environment dependent configuration
 var env = config.get('env');
 config.loadFile('./' + env + '.json');

 // Perform validation
 config.validate({strict: true});

 module.exports = config;