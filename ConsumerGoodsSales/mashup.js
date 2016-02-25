var config = {
    host: "localhost",
    prefix: "/",
    port: 4848,
    isSecure: false
};

require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function (qlik) {
    qlik.setOnError(function (error) {
        alert(error.message);
    });

    var app = qlik.openApp("Consumer_Sales.qvf", config);
    $(".qvobject").each(function () {
        var qvid = $(this).data("qvid");
        app.getObject(this, qvid);
    });

    app.createCube({
        qDimensions: [{
            qDef: { qFieldDefs: ["latitude"] }
        }, {
            qDef: { qFieldDefs: ["longitude"] }
        }],
        qMeasures: [{
            qDef: { qDef: "num(sum([Sales Amount]), '$#,##0')" }
        }],
        qInitialDataFetch: [{
            qHeight: 1000,
            qWidth: 3
        }]
    }, function (reply) {
        var options = {
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("chart"), options);
        var latlngbounds = new google.maps.LatLngBounds();
        var markers = [];

        $.each(reply.qHyperCube.qDataPages[0].qMatrix, function (index, value) {
            if (this[0].qNum != "NaN" && this[1].qNum != "NaN") {
                var latLng = new google.maps.LatLng(this[0].qNum, this[1].qNum);
                var marker = new google.maps.Marker({ 'position': latLng, 'title': this[2].qText });

                var caption = this[2].qText;
                marker.infoWindow = new google.maps.InfoWindow({
                    content: caption
                });

                google.maps.event.addListener(marker, 'mouseover', function () {
                    this.infoWindow.open(map, this);
                });

                google.maps.event.addListener(marker, 'mouseout', function () {
                    this.infoWindow.close();
                });

                /*
                google.maps.event.addListener(marker, 'click', function () {
                    app.field("[Your Filed]").toggleSelect(this.title, false);
                });
                */

                latlngbounds.extend(latLng);
                markers.push(marker);
            }
        });
        
        map.fitBounds(latlngbounds);

        var mcOptions = {
            gridSize: 30,
            maxZoom: 20
        };
        var markerCluster = new MarkerClusterer(map, markers, mcOptions);
    });

    app.createList({
        "qDef": { "qFieldDefs": ["Sales Rep Name"] },
        "qInitialDataFetch": [{
            qTop: 0,
            qLeft: 0,
            qHeight: 20,
            qWidth: 1
        }]
    }, function (reply) {
        $("#replist").empty();
        $("#reptitle").html("Sales Rep");
        var qObject = reply.qListObject;
        $.each(qObject.qDataPages[0].qMatrix, function () {
            var item = this[0];
            var selT = "";
            if (item.qState == "S") {
                currentReg = item.qText;
                selT = " style=\"font-weight:bold;\"";

                $("#reptitle").html(item.qText);
            }
            $("#replist").append("<li><a" + selT + " href=\"#\">" + item.qText + "</a></li>");
        });

        $("#replist li").click(function () {
            app.field("Sales Rep Name").toggleSelect($(this).text(), false);
        });
    });

    $(".qvobject").each(function() {
		var qvid = $(this).data("qvid");
		app.getObject(this, qvid);
    });
});