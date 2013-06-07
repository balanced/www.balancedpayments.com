var timer = null;
var interval = 1000 * 60; // 1 minute

var loadData = function () {
    console.log('loading');
    $('.g').each(loadGraph);

    //  hack
    if ($(document).width() == 1920) {
        $('.g').css({width: 1900 / 3});
    }
};

var loadGraph = function (i, e) {
    var $g = $(e);
    var uri = $g.data('uri');

    var callback = function(data, status) {
        renderGraph.apply(self, [data, status, $g]);
    };

    $.get(uri, callback);
};

var renderGraph = function (data, status, $g) {
    console.log($g.data('uri'), data);
    var summaryFields = $g.data('field-transforms');
    var summaryFormat = $g.data('field-format');
    var graphValue = $g.data('graph-value');
    var formatter = formatters.numeric;
    if (summaryFormat) {
        formatter = formatters.get(summaryFormat);
    }
    loadSummary(summaryFields, summaryFormat, data);

    $.each(data.data, function (i, d) {
        var raw = d.date.split('-');
        d.date = new Date(raw[0], raw[1] - 1, raw[2].replace('Z', ''));
    });

    var nestedData = d3.nest()
        .key(function(d) { return d.date; })
        .rollup(function(v) {
            return v.map(function(d) {
                d.__bar_value = graphValue;
                return d;
            });
        })
        .map(data.data);

    crankAGraph($g, data, nestedData, formatter);
};

function crankAGraph($g, data, nestedData, formatter) {
    // actual graph loading time!
    var width = 595,
        height = 350,
        graphWidth = 500.0,
        graphHeight = 245,
        spacingBottom = 70;

    var x = d3.time.scale()
        .range([0, 485]).clamp(true);

    var y = d3.scale.linear()
        .rangeRound([0, graphHeight]);

    // An SVG element with a bottom-right origin.
    var svg = $g.data('graph') || d3.select($g[0]).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + (width - 20) + "," + height + ")scale(-1,-1)");

    svg.append('defs')
        .append('pattern')
        .attr('id', 'img1')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 72).attr('height', 72)
        .append('image')
        .attr('xlink:href', '/images/stats/stats-past-bg.png')
        .attr('x', 0).attr('y', 0)
        .attr('width', 72).attr('height', 72);

    var minDate = d3.min(data.data, function(d) { return d.date; }),
        maxDate = d3.max(data.data, function(d) { return d.date; }),
        minCount = d3.min(data.data, function(d) { return d[d.__bar_value]; }),
        maxCount = d3.max(data.data, function(d) { return d[d.__bar_value]; }),
        minTarget = d3.min(data.data, function(d) { return d.target || 0; }),
        maxTarget = d3.max(data.data, function(d) { return d.target || 0; }),
        barWidth = graphWidth / data.data.length;

    maxCount = maxCount > maxTarget ? maxCount : maxTarget;
    minCount = minCount < minTarget ? minCount : minTarget;
    if (minCount > 0) {
        minCount = 0;
    }

    x.domain([minDate, maxDate]).nice(d3.time.day);
    y.domain([minCount, maxCount + maxCount * 0.1]);

    var title = svg.selectAll('text.title')
        .data([1]).enter().append("text")
        .attr("class", "title")
        .attr("dy", "1em")
        .attr("transform", "translate(" + 0 + "," + height + ")scale(-1,-1)")
        .text($g.attr('title'));

    // A container to hold the bars.
    var body = svg.selectAll('g.body')
        .data([1]).enter()
        .append("g").attr('class', 'body')
        .attr("transform", "translate(0, " + spacingBottom + ")");

    var days = body.selectAll("g.bar")
        .data(x.ticks(d3.time.days))
        .enter().append("g")
        .attr('class', function (d) { return (d <= new Date()) ? 'bar past' : 'bar'; })
        .attr("transform", function(d, i) {
            //  - barWidth because we have flipped the scale
            //  x(d) graphWidth, barWidth
            // 0 500 8.474576271186441
//            console.log('1', graphWidth - barWidth - x(d))
            return "translate(" + (graphWidth - barWidth - x(d)) + ",0)";
        });

    days.selectAll("rect.days")
        .data(function(d) {
            var a = nestedData[d];
            var v = (a && a[0]) ? a && a[0] : 0;
            return [v];
        })
        .enter().append("rect")
        .attr('class', function (d) {
            if (d.target && d[d.__bar_value] < d.target) {
//                console.log(d, d.target, d[d.__bar_value]);
                return 'days missed';
            }
            return 'days';
        })
        .attr('title', function (d) { return d ? d.date.strftime('%d, %b %Y') : ''; })
        .attr("x", 1)
        .attr("width", barWidth)
        .attr("height", 0);

    var pastWidth = graphWidth / 2;

    var pastOverlay = body.selectAll('rect.past')
        .data([1])
        .enter().append('rect')
        .attr('class', 'past')
        .attr('x', graphWidth / 2)
        .attr('y', 0)
        .attr('height', graphHeight)
        // +2 is a magic number
        .attr('width', graphWidth - pastWidth + 2);

    var targetLine = d3.svg.line()
        .x(function (d) {
            return graphWidth - x(d.date);
        })
        .y(function (d) { return y(d.target); })
        .interpolate('basis-open');

    var targetData = data.data.filter(function(e, i, a) {
        return e.target !== null;
    });

    body.append("path")
        .attr('class', 'target')
        .attr("d", function(d) { return targetLine(targetData); });

    // A container to hold the y-axis rules.
    var rules = svg.selectAll('g.rules')
        .data([1]).enter()
        .append("g").attr('class', 'rules')
        .attr("transform", "translate(0, " + spacingBottom + ")");

    // Add rules to show the population values.
    rules = rules.selectAll(".rule")
        .data(y.ticks(4))
        .enter().append("g")
        .attr("class", "rule")
        .attr("transform", function(d) { return "translate(-0," + y(d) + ")"; });

    rules.append("line")
        .attr("x2", width);

    rules.append("text")
        .attr("x", 40)
        .attr("dy", "1em")
        .attr("transform", "translate(" + (width - 45) + "," + 0 + ")rotate(180)")
        .text(function(d) { return (d) ? formatter(d) : ''; });

    var xAxis = svg.selectAll('g.xAxis')
        .data([1])
        .enter()
        .append('g')
        .attr('class', 'xAxis')
        .attr('transform', 'translate(0, 10)');

    xAxis.append("line")
        .attr('class', 'x-line')
        .attr("x1", 7)
        .attr("x2", graphWidth)
        .attr("y1", spacingBottom - 12)
        .attr("y2", spacingBottom - 12);

    var xTicks = xAxis.selectAll("g.x")
        .data(x.ticks(10))
        .enter()
        .append('g')
        .attr('class', function (d) { return (d <= new Date()) ? 'x past' : 'x'; });
    xTicks.append('line')
        .attr('class', 'x-tick')
        .attr("x1", 10)
        .attr("x2", 10)
        .attr("y1", 10)
        .attr("y2", 15)
        .attr("transform", function(d) {
            return 'translate(' + (graphWidth - x(d) + barWidth) + ',' + spacingBottom + ')rotate(180)';
        });
    xTicks.append('text')
        .attr("dy", -35)
        .attr("transform", function(d) {
            return "translate(" + (graphWidth - x(d) + barWidth) + ",0)rotate(180)";
        })
        .text(function(d) { return d.strftime('%d'); });

    var now = new Date();
    xAxis.selectAll('g.marker')
        .data([minDate, now, maxDate])
        .enter()
        .append('g').attr('class', 'marker')
        .attr('width', 58)
        .attr('height', 44)
        .attr('now', now)
        .each(createTrithing)
        .attr('transform', function(d) {
            return 'translate(' + (graphWidth - x(d) + (d != maxDate ? 30 : 25)) + ',50)rotate(180)';
        });

    function redraw() {
        days.selectAll("rect.days")
            .data(function(d) {
                var a = nestedData[d];
                var v = (a && a[0]) ? a && a[0] : 0;
                return [v];
            })
            .transition()
            .duration(750)
            .attr("height", function (d) {
                return y(d[d.__bar_value]);
            });
    }

    redraw();

    $g.data('graph', svg);
}

function createTrithing (d, i) {
    var el = d3.select(this);
    var width = el.attr('width') || 58;
    var height = el.attr('height') || 44;
    var now = el.attr('now');
    var boxHeight = width / 100 * 53,
        triHeight = parseInt((width - boxHeight));

    var g = el.append("g").attr('class', 'tri')
        .attr('width', width)
        .attr('height', height);
    g.append('path')
        .attr('d', function(d) {
            var x = width / 2, y = 0;
            var w = triHeight / 2, h = triHeight;
            return 'M ' + x +' '+ y + ' l ' + (w / 2) + ' ' + h + ' l ' + (w * -1) + ' 0 z';
        }).attr('class', 'tri');
    g.append('rect')
        .attr('width', width)
        .attr('height', boxHeight)
        .attr('rx', 2).attr('ry', 2)
        .attr('y', triHeight);
    var t = g.append('text')
        .attr('y', triHeight + boxHeight / 2)
        .attr('dx', 8)
        .attr('dy', 5)
        .attr('width', width);
    if (d) {
        t.text(d == now ? 'Today' : d.strftime('%b %d'));
    }
}

var loadSummary = function (summaryFields, summaryFormat, data) {
    if (!summaryFields) {
        return;
    }
    var nonPredictive = [];
    $.each(data.data, function(i,d) {
        if (!d.predictive) {
            nonPredictive.push(d);
        }
    });

    var mostRecentRecord = nonPredictive[nonPredictive.length - 1];
    console.log(mostRecentRecord);

    var raw = mostRecentRecord.date.split('-');
    var mostRecentDate = new Date(raw[0], raw[1] - 1, raw[2].replace('Z', ''));

    $('#summary-dates').find('.time').text(new Date().strftime('%H:%M'));
    $('#summary-dates').find('.date').text(mostRecentDate.strftime('%b %d'));

    var formatter = formatters.numeric;
    if (summaryFormat) {
        formatter = formatters.get(summaryFormat);
    }
    for (var key in summaryFields) {
        $(summaryFields[key]).find('h1').text(
            formatter(mostRecentRecord[key])
        );
    }
};

var formatters = (function () {
    function num(input) {
        input = parseFloat(input);
        if (input < 100) {
            // $95.68
            if (input % 1 === 0) {
                return Math.round(input);
            }
            return input.toFixed(2);
        }
        if (input < 1000) {
            //  $995 - no decimal
            return parseInt(input, 10);
        }
        if (input < 10000) {
            // $4,560 - no decimal
            input = parseInt(input, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return input;
        }
        if (input < 1000000) {
            // $456K - no hundreds
            input = Math.round(parseInt(input, 10) / 1000);
            return input + 'K';
        }
        //  $1.2M - 1 decimal, for hundreds of thousands
        input = input / 1000000;
        return input.toFixed(1) + 'M';
    }
    function cur(input) {
        return '$' + num(input / 100.0);
    }
    function percentage(input) {
        return num(input) + '%';
    }
    function get(type) {
        switch(type) {
            case '$':
                return cur;
            case '%':
                return percentage;
            default:
                return num;
        }
    }
    return {
        get: get,
        numeric: get('numeric'),
        currency: get('$'),
        percentage: get('%')
    };
})();

var Balanced = {
    init: function (params) {
        BS.init(params);
    }
};

var BS = {
    init:function (params) {
        loadData();
        timer = setInterval(loadData, interval);
        console.log('running');
    }
};

Balanced.BS = BS;
