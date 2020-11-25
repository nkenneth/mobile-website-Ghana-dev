const preCacheName = "pre-cache-hbp",

    preCacheFiles = [

         "/",
		"~/Views/Ambassadors/Index.cshtml",
		"~/Views/Ambassadors/login.cshtml",
		//"~/AssetsAmbassadors/css/main.css",

        //"css/normalize.css",

        //"css/main.css",

        //"img/html5boilerplate-152x152.png",

        //"js/vendor/modernizr-3.5.0.min.js",

        "https://code.jquery.com/jquery-3.2.1.min.js",

        //"js/plugins.js",

        //"js/main.js"

    ];

self.addEventListener("install", event => {

	console.log("installing");
	caches.open(preCacheName).then(function (cache) {

		return cache.addAll(preCacheFiles);

	});

});

self.addEventListener("fetch", event => {

	event.respondWith(

        caches.match(event.request).then(response => {

        	if (!response) {

        		//fall back to the network fetch

        		return fetch(event.request);

        	}

        	return response;

        })

    )

});