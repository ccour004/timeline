(this.webpackJsonptimelinetest=this.webpackJsonptimelinetest||[]).push([[0],{20:function(t,e,n){t.exports=n(33)},25:function(t,e,n){},30:function(t,e,n){},33:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),i=n(3),c=n.n(i),r=(n(25),n(8)),s=n(9),l=n(12),u=n(11),d=n(14),m=n.n(d),_=n(10),S=(n(30),n(47)),E=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(m.a,{data:{labels:["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10"],series:[[1,2,4,8,6,-2,-1,-4,-6,-2]]},options:{high:10,low:-10,axisX:{labelInterpolationFnc:function(t,e){return e%2===0?t:null}}},type:"Line"}))}}]),n}(o.a.Component),T=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(r.a)(this,n),(a=e.call(this,t)).state={isSigned:!1,access_token:"",url:"https://www.googleapis.com/calendar/v3/",CALENDAR_LIST:"users/me/calendarList",items:[]},a}return Object(s.a)(n,[{key:"apiCall",value:function(t,e,n){fetch(this.state.url+t+"?key="+Object({NODE_ENV:"production",PUBLIC_URL:"/timeline",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_API_KEY+"&"+e,{headers:{Authorization:"Bearer "+this.state.access_token,Accept:"application/json"}}).then((function(t){return t.json()})).then((function(t){n(t)}))}},{key:"render",value:function(){var t=this;return this.state.isSigned?o.a.createElement("div",null,o.a.createElement(_.GoogleLogout,{clientId:Object({NODE_ENV:"production",PUBLIC_URL:"/timeline",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_CLIENT_ID,buttonText:"Logout",onLogoutSuccess:function(){return t.setState({isSigned:!1,access_token:""})}}),o.a.createElement(S.a,{onClick:function(){return t.apiCall(t.state.CALENDAR_LIST,"",(function(t){console.log(JSON.stringify(t))}))}},"Calendar List"),o.a.createElement(S.a,{onClick:function(){return t.apiCall("calendars/primary/events","timeMin=2020-02-02T10:00:00-07:00",(function(e){t.setState({items:e.items}),e.items.forEach((function(t){console.log("SUMMARY: "+t.summary+",START: "+(t.start?t.start.date?t.start.date:t.start.dateTime:""))}))}))}},"Event List"),o.a.createElement(E,null),this.state.items.map((function(t){return void 0===t.summary?null:o.a.createElement("div",null,"SUMMARY: ",t.summary,",START: ",t.start?t.start.date?t.start.date:t.start.dateTime:"")}))):o.a.createElement(_.GoogleLogin,{clientId:Object({NODE_ENV:"production",PUBLIC_URL:"/timeline",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_CLIENT_ID,buttonText:"Login",scope:"https://www.googleapis.com/auth/calendar",onSuccess:function(e){t.setState({access_token:e.wc.access_token,isSigned:!0})},onFailure:function(){return alert("Login failed!")},cookiePolicy:"single_host_origin"})}}]),n}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.734efbe9.chunk.js.map