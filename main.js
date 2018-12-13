//TODO Make compatibility for iOS
//TODO Make the mobile version easier

var data = undefined;
var paladin_data = undefined;
var priest_data = undefined;
var sniper_data = undefined;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
    $("#map").html("");
    var svg = d3.select("#map").append("svg").attr("width", 1000).attr("height", 1000);

    svg.append("text")
        .attr("x", 400)
        .attr("y", 100)
        .text("^^^   Click on a job   ^^^");

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function JobMap(job, data) {

    $("#namejob").html(job);
    $("#map").html("");
    var width = 1000;
    var height = 1000;

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

    console.log("DATAAAAAAA");
    console.log(data);


    // Here we create a SVG with a group (to implement margins)
    var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height);
    var g = svg.append("g");

    var circle = svg.selectAll(".circl")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circl")
        .attr("cx", function(d){
            return d.posx;
        })
        .attr("cy", function(d){
            return d.posy;
        })
        .attr("r", 15)
        .attr("opacity",0.1)    //.attr("opacity",0.1)
        .attr("fill", "#110000") //.attr("fill", "#110000")

        .on("mouseover", function(d){

            tooltip
                .style("left", d3.event.pageX + 40 + "px")
                .style("top", d3.event.pageY + "px")
                .style("display", "inline-block")
                .transition()
                    .duration(200)
                    .style("opacity", .95);

                if (d.unlock == "no"){
                    tooltip.html((d.id));
                } else {
                    tooltip.html("<em style='color: #FF0000'>" + (d.unlock) + "</em><hr>" + (d.name));
                }




        })
        .on("mouseout", function(d){
            tooltip
                .style("opacity", 0)
                .style("display", "none");
        });



    var myimage = g.append('image')
        .attr('src:href', 'image/' + job + '.jpg')
        .attr('width', width)
        .attr('height', height)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw_all(job,showdata) {

    JobMap(job, showdata);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This is the jQUery ready function, just to make sure everything is loaded
$(function () {

    var paladin_csv = "csv/paladin.csv";
    var priest_csv = "csv/priest.csv";
    var sniper_csv = "csv/sniper.csv";


    d3.csv(paladin_csv,function (d) {
        data = d;
        data.forEach(function (d) {
            d.id = +d.id;
            d.posx = +d.posx;
            d.posy = +d.posy;
        });
        paladin_data = data;

    })

    d3.csv(sniper_csv,function (d) {
        data = d;
        data.forEach(function (d) {
            d.id = +d.id;
            d.posx = +d.posx;
            d.posy = +d.posy;
        });
        sniper_data = data;
    });

    d3.csv(priest_csv,function (d) {
        data = d;
        data.forEach(function (d) {
            d.id = +d.id;
            d.posx = +d.posx;
            d.posy = +d.posy;
        });
        priest_data = data;
        draw_all("priest",priest_data);
    });


    $("#paladin").click(function () {
        draw_all("paladin",paladin_data);
    });

    $("#priest").click(function () {
        draw_all("priest",priest_data);
    });

    $("#sniper").click(function () {
        draw_all("sniper",sniper_data);
    });

});

