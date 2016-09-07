    var marginTop = 80,
        marginLeft = 100,
        fieldSize = 80,
		boardDimension = 8,
        boardSize = boardDimension*fieldSize;
				
    var board =[];
    
    for(var i = 0; i < boardDimension*boardDimension; i++) {
        board.push({
            x: i % boardDimension,
            y: Math.floor(i / boardDimension),
            piece: 0
        });
    };

    var div = d3.select("body")
        .append("div")
        .style("position", "fixed")
        .style("top", marginTop + "px")
        .style("left", marginLeft + "px")
        .style("width", boardSize + "px")
		.style("height", boardSize + "px")
		.style(
			{border: '4px solid black'}
		);

    var svg = div.append("svg")
         .attr("width", boardSize + "px")
         .attr("height", boardSize + "px")
         .selectAll(".fields")
         .data(board)
        .enter()
        .append("g");

    svg.append("rect")
		.style("class", "fields")
        .style("class", "rects")
		.attr("x", function (d) {
             return d.x*fieldSize;
         })
        .attr("y", function (d) {
             return d.y*fieldSize;
         })
        .attr("width", fieldSize + "px")
        .attr("height", fieldSize + "px")
		.style("fill", function (d) {
             if (((d.x%2 == 0) && (d.y%2 == 0)) || ((d.x%2 == 1) && (d.y%2 == 1))    ) 
                 return "white";
             else
                 return "black";
        }); 		 
		 
	svg.append("text")
		.transition()
		.duration(5000)
		.delay(200)
        .style("font-size", "50")
        .attr("text-anchor", "middle")
        .attr("dy", "60px")
        .attr("dx", "40px")
        .text('\uD83D\uDE3C');