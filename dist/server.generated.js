module.exports=function(e){var t={};function r(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(o,a,function(t){return e[t]}.bind(null,a));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/",r(r.s=8)}([function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,r){"use strict";(function(e){var r;Object.defineProperty(t,"__esModule",{value:!0}),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var o,a,s={env:"production",port:process.env.PORT||3e3,jwtSecret:process.env.JWT_SECRET||"YOUR_secret_key",mongoUri:process.env.MONDODB_URI||process.env.MONGO_HOST||"mongodb://"+(process.env.IP||"localhost")+":"+(process.env.MONGO_PORT||"27017")+"/mernproject"},l=s;t.default=l,(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(o.register(s,"config","/Users/shalabh/Courses/packt-fullstack-react/config/config.js"),o.register(l,"default","/Users/shalabh/Courses/packt-fullstack-react/config/config.js")),(a="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&a(e)}).call(this,r(0)(e))},function(e,t){e.exports=require("express")},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o,a=l(r(4)),s=l(r(19));function l(e){return e&&e.__esModule?e:{default:e}}(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var u=new a.default.Schema({name:{type:String,trim:!0,required:"Name is required"},email:{type:String,trim:!0,unique:"Email already exists",match:[/.+\@.+\..+/,"Please fill a valid email address"],required:"Email is required"},hashed_password:{type:String,required:"Password is required"},salt:String,created:{type:Date,default:Date.now},updated:Date});u.virtual("password").set((function(e){console.log("Setting password"),this._password=e,this.salt=this.makeSalt(),this.hashed_password=this.encryptPassword(e)})).get((function(){return this._password})),u.methods={authenticate:function(e){return this.encryptPassword(e)===this.hashed_password},encryptPassword:function(e){if(!e)return"";try{return console.log("Encrypting password"),s.default.createHmac("sha1",this.salt).update(e).digest("hex")}catch(e){return""}},makeSalt:function(){return Math.round((new Date).valueOf()*Math.random())+""}},u.path("hashed_password").validate((function(e){console.log("In validate"),this._password&&this._password.length<6&&this.invalidate("password","Password must be at least 6 characters."),this.isNew&&!this._password&&this.invalidate("password","Password is required"),console.log("Done validating")}),null);var n,d,i=a.default.model("User",u);t.default=i,(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(u,"UserSchema","/Users/shalabh/Courses/packt-fullstack-react/server/models/user.model.js"),n.register(i,"default","/Users/shalabh/Courses/packt-fullstack-react/server/models/user.model.js")),(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&d(e)}).call(this,r(0)(e))},function(e,t){e.exports=require("mongoose")},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o,a=n(r(3)),s=n(r(21)),l=n(r(22)),u=n(r(1));function n(e){return e&&e.__esModule?e:{default:e}}(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var d,i,c=function(e,t){a.default.findOne({email:e.body.email},(function(r,o){if(r||!o)return t.status("401").json({error:"User Not Found"});if(!o.authenticate(e.body.password))return t.status("401").send({error:"Email and password don't match"});var a=s.default.sign({_id:o.id},u.default.jwtSecret);return t.cookie("t",a,{expire:new Date+9999}),t.json({token:a,user:{_id:o._id,name:o.name,email:o.email}})}))},f=function(e,t){return t.clearCookie("t"),t.status("200").json({message:"signed out"})},p=(0,l.default)({secret:u.default.jwtSecret,userProperty:"auth"}),b=function(e,t,r){var o=e.profile&&e.auth&&e.profile._id==e.auth._id;if(console.log("In hasAuthorization"),!o)return t.status("403").json({error:"User is not authorized"});r()},h={signin:c,signout:f,requireSignin:p,hasAuthorization:b};t.default=h,(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(d.register(c,"signin","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/auth.controller.js"),d.register(f,"signout","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/auth.controller.js"),d.register(p,"requireSignin","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/auth.controller.js"),d.register(b,"hasAuthorization","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/auth.controller.js"),d.register(h,"default","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/auth.controller.js")),(i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&i(e)}).call(this,r(0)(e))},function(e,t){e.exports=require("webpack")},function(e,t){e.exports=require("path")},function(e,t,r){e.exports=r(9)},function(e,t,r){"use strict";var o=l(r(1)),a=l(r(10)),s=l(r(4));function l(e){return e&&e.__esModule?e:{default:e}}"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;s.default.Promise=global.Promise,s.default.connect(o.default.mongoUri),s.default.connection.on("error",(function(){throw new Error("unable to connect to database: "+o.default.mongoUri)})),a.default.listen(o.default.port,(function(e){e&&console.log(e),console.info("Server started on port %s.",o.default.port)}))},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o,a=h(r(2)),s=h(r(11)),l=h(r(12)),u=h(r(13)),n=h(r(14)),d=h(r(15)),i=h(r(16)),c=h(r(17)),f=h(r(23)),p=h(r(24)),b=h(r(7));function h(e){return e&&e.__esModule?e:{default:e}}(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var v=process.cwd(),g=(0,a.default)();p.default.compile(g),g.use(s.default.json()),g.use(s.default.urlencoded({extended:!0})),g.use((0,l.default)()),g.use((0,u.default)()),g.use((0,d.default)()),g.use((0,n.default)()),g.use("/",c.default),g.use("/",f.default),g.use("/dist",a.default.static(b.default.join(v,"/dist"))),g.get("/",(function(e,t){t.status(200).send((0,i.default)())})),g.use((function(e,t,r,o){"UnauthorizedError"===e.name&&r.status(401).json({error:e.name+": "+e.message})}));var y,G,H=g;t.default=H,(y="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(y.register(v,"CURRENT_WORKING_DIR","/Users/shalabh/Courses/packt-fullstack-react/server/express.js"),y.register(g,"app","/Users/shalabh/Courses/packt-fullstack-react/server/express.js"),y.register(H,"default","/Users/shalabh/Courses/packt-fullstack-react/server/express.js")),(G="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&G(e)}).call(this,r(0)(e))},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("helmet")},function(e,t,r){"use strict";(function(e){var r;Object.defineProperty(t,"__esModule",{value:!0}),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var o,a,s=function(){return'<!doctype html>\n\t    <html lang="en">\n              <head>\n                <meta charset="utf-8">\n                <title>MERN social App</title>\n\t\t<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400" />\n\t\t<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />\n              </head>\n              <body>\n                <div id="root">Hello World</div>\n\t\t<script type="text/javascript" src="/dist/bundle.js"><\/script>\n              </body>\n            </html>'};t.default=s,(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&o.register(s,"default","/Users/shalabh/Courses/packt-fullstack-react/template.js"),(a="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&a(e)}).call(this,r(0)(e))},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o,a=u(r(2)),s=u(r(18)),l=u(r(5));function u(e){return e&&e.__esModule?e:{default:e}}(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var n=a.default.Router();n.route("/api/users").get(s.default.list).post(s.default.create),n.route("/api/users/:userId").get(l.default.requireSignin,s.default.read).put(l.default.requireSignin,l.default.hasAuthorization,s.default.update).delete(l.default.requireSignin,l.default.hasAuthorization,s.default.remove),n.param("userId",s.default.userByID);var d,i,c=n;t.default=c,(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(d.register(n,"router","/Users/shalabh/Courses/packt-fullstack-react/server/routes/user.routes.js"),d.register(c,"default","/Users/shalabh/Courses/packt-fullstack-react/server/routes/user.routes.js")),(i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&i(e)}).call(this,r(0)(e))},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o,a=l(r(3)),s=l(r(20));function l(e){return e&&e.__esModule?e:{default:e}}(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var u,n,d=function(e,t,r){new a.default(e.body).save((function(e,r){if(e)return t.status(400).json({error:s.default.getErrorMessage(e)});t.status(200).json({message:"Successfully signed up!"})}))},i=function(e,t){a.default.find((function(e,r){if(e)return t.status(400).json({error:s.default.getErrorMessage(e)});t.json(r)}))},c=function(e,t,r,o){a.default.findById(o).exec((function(o,a){if(o||!a)return t.status(400).json({error:"User not found"});e.profile=a,r()}))},f=function(e,t){return e.profile.hashed_password=void 0,e.profile.salt=void 0,t.json(e.profile)},p=function(e,t,r){var o=e.profile;(o=_extend(o,e.body)).updated=Date.now(),o.save((function(e){return e?t.status(400).json({error:s.default.getErrorMessage(e)}):(o.hashed_password=void 0,o.salt=void 0,o)}))},b=function(e,t,r){e.profile.remove((function(e,r){return e?t.status(400).json({error:s.default.getError(e)}):(r.hashed_password=void 0,r.salt=void 0,r)}))},h={create:d,list:i,userByID:c,read:f,update:p,remove:b};t.default=h,(u="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(u.register(d,"create","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/user.controller.js"),u.register(i,"list","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/user.controller.js"),u.register(c,"userByID","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/user.controller.js"),u.register(f,"read","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/user.controller.js"),u.register(p,"update","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/user.controller.js"),u.register(b,"remove","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/user.controller.js"),u.register(h,"default","/Users/shalabh/Courses/packt-fullstack-react/server/controllers/user.controller.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)}).call(this,r(0)(e))},function(e,t){e.exports=require("crypto")},function(e,t,r){"use strict";r.r(t);t.default={getErrorMessage:function(e){return e}}},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("express-jwt")},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o,a=l(r(2)),s=l(r(5));function l(e){return e&&e.__esModule?e:{default:e}}(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var u=a.default.Router();u.route("/auth/signin").post(s.default.signin),u.route("/auth/signout").get(s.default.signout);var n,d,i=u;t.default=i,(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(u,"router","/Users/shalabh/Courses/packt-fullstack-react/server/routes/auth.routes.js"),n.register(i,"default","/Users/shalabh/Courses/packt-fullstack-react/server/routes/auth.routes.js")),(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&d(e)}).call(this,r(0)(e))},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var o,a=d(r(1)),s=d(r(6)),l=d(r(25)),u=d(r(26)),n=d(r(27));function d(e){return e&&e.__esModule?e:{default:e}}(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var i,c,f=function(e){if("development"===a.default.app){var t=(0,s.default)(n.default),r=(0,l.default)(t,{publicPath:n.default.output.publicPath});e.use(r),e.use((0,u.default)(t))}},p={compile:f};t.default=p,(i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(i.register(f,"compile","/Users/shalabh/Courses/packt-fullstack-react/server/devBundle.js"),i.register(p,"default","/Users/shalabh/Courses/packt-fullstack-react/server/devBundle.js")),(c="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&c(e)}).call(this,r(0)(e))},function(e,t){e.exports=require("webpack-dev-middleware")},function(e,t){e.exports=require("webpack-hot-middleware")},function(e,t,r){"use strict";(function(e){var t;(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&t(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var o,a,s=r(7),l=r(6),u=process.cwd(),n={name:"browser",mode:"development",devtool:"eval-source-map",entry:["react-hot-loader/patch","webpack-hot-middleware/client?reload=true",s.join(u,"client/main.js")],output:{path:s.join(u,"/dist"),filename:"bundle.js",publicPath:"/dist/"},module:{rules:[{test:/\.jsx?$/,exclude:/node_modules/,use:["babel-loader"]},{test:/\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,use:"file-loader"}]},plugins:[new l.HotModuleReplacementPlugin,new l.NoEmitOnErrorsPlugin]};e.exports=n,(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(o.register(u,"CURRENT_WORKING_DIR","/Users/shalabh/Courses/packt-fullstack-react/webpack.config.client.js"),o.register(n,"config","/Users/shalabh/Courses/packt-fullstack-react/webpack.config.client.js")),(a="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&a(e)}).call(this,r(0)(e))}]);