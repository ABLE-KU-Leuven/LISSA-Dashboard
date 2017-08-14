

Template.resultGraph.onRendered(function(){
  // TODO: let width depend on screen
  /*
    ++++++++++++++++++++++++++++++++
    +     Name             + stp   +
    + ++++++++++++++++++++++++++++++
    +  Grade +     histogram       +
    +        +                     +
    ++++++++++++++++++++++++++++++++
    Info = name + stp
    Name = 0.8 of width and 0.3 of height
    Grade = 0.25 of width
  */

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !! all these variables are alse defined in course.js!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  var totalCourseWidth = window.innerWidth / 8.5;
  var totalCourseHeight = 50;

  var fractionNameWidth  = 0.8;
  var fractionNameHeight = 0.3;
  var fractionGradeWidth = 0.25;
  var courseInfoWidth = totalCourseWidth ;
  var courseInfoHeight = fractionNameHeight * totalCourseHeight;
  var courseNameWidth = fractionNameWidth * courseInfoWidth;
  var courseNameHeight = courseInfoHeight;
  var courseCreditsWidth = (1-fractionNameWidth) * courseInfoWidth;
  var courseCreditsHeight = courseInfoHeight;

  var gradeWidth = fractionGradeWidth * totalCourseWidth ;
  var gradeHeight = (1-fractionNameHeight) * totalCourseHeight;
  var svgHistogramWidth = (1-fractionGradeWidth) * totalCourseWidth;
  var svgHistogramHeight = gradeHeight;

  var border = 2;
  var radius = 3;

  var clicked = false;

  var instance = this;
  
  var data = this.data;
  var courseId = data.id;
  var courseName = data.name;
  var courseGrade = data.grade;
  var realGrade = data.realGrade;
  var semesterCourse = data.semester;
  var courseCredits  = data.credits;
  var gradeStatus = status(realGrade);
  var courseColor = colorStatus(gradeStatus);
  var container = d3.select("#"+courseId +"_"+semesterCourse).append("svg");
  container
    .attr("width",totalCourseWidth)
    .attr("height", totalCourseHeight)
    .style("position", "relative")
    ;

  function status(grade) {

    if(grade < 8)
    {
      return "failed";
    }
    else if(grade > 9)
    {
      return "passed";
    }
    else if(grade >= 8 && grade <= 9){
      return "tolerable";
    }
    else {
      return "failed";
    }
  };

  function colorStatus(status){
    switch(status){
      case "failed":
        color = "#FD6869";
        break;
      case "tolerable":
        color = "#E1B32D";
        break;
      case "passed":
        color = "#A5DC89";
        break;
      default:
        color = "#777777";
    }
    return color;
  }

  function formattedCredits(credits){
    if(credits != 0)
      return "["+credits +"stp]";
    return "";
  }

  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")) || 0,
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }


  function leftbottomRoundedRect(x, y, width, height, radius) {
  return "M" + x + "," + y
       + "h" + width
       + "v" + height
       + "h" + (radius - width)
       + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius
       + "z";
  }

  function appendSvg(parent, svgClass, width, height, x, y ){
    var svg = parent.append("svg")
    svg
      .attr("class", svgClass)
      .attr("width", width)
      .attr("height", height)
      .attr("x", x)
      .attr("y", y)
      ;
    return svg;
  }


  // Make all svg's
  var bottomLayer = appendSvg(container, "bottomlayer", totalCourseWidth, totalCourseHeight, 0,0);
  var topLayer = appendSvg(container, "toplayer", totalCourseWidth, totalCourseHeight, 0,0);
  var svgCourseInfo = appendSvg(bottomLayer, "courseinfo", courseInfoWidth, courseInfoHeight,0,0);
  var svgCourseName = appendSvg(svgCourseInfo, "coursename", courseNameWidth, courseNameHeight,0,0);
  var svgCourseCredits = appendSvg(svgCourseInfo, "coursecredits", courseCreditsWidth, courseCreditsHeight,courseNameWidth,0);
  var svgCourseGrade = appendSvg(bottomLayer, "coursegrade", gradeWidth, gradeHeight,0,courseInfoHeight);
  var svgHistogram = appendSvg(bottomLayer, "histogram", svgHistogramWidth, svgHistogramHeight, gradeWidth, courseInfoHeight);

  // A rounded border around everything
  var borderPath = topLayer.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("rx", radius)
    .attr("height", totalCourseHeight)
    .attr("width", totalCourseWidth)
    .style("stroke", courseColor)
    .style("fill", "none")
    .style("stroke-width", border);
             
  //A line under the name
  var separator = topLayer.append("line")
    .attr("x1", 0)
    .attr("x2", totalCourseWidth)
    .attr("y1", courseInfoHeight)
    .attr("y2", courseInfoHeight)
    .style("stroke", courseColor)
    ;

  // The rectangle where we place the grade
  svgCourseGrade
    .append("path")
      .attr("d", leftbottomRoundedRect(0,0,gradeWidth, gradeHeight, radius))
      .attr("fill", courseColor)
    ;

  // The grade
  svgCourseGrade
    .append("text")
    .text(realGrade)
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .attr("transform", "translate("+ gradeWidth/2.0 +","+ gradeHeight/2.0 + ")")
    ;
  
  
  // The course name
  svgCourseName
    .append("text")
    .text(courseName)
      .attr("font-family", "sans-serif")
      .attr("font-size", function(){
          return "8px"
      })
      .attr("color", "#777777")
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "central")
      .attr("transform", "translate("+ 0.05*courseNameWidth +","+ (0.5*courseNameHeight) + ")")
    ;

    // The credits of the course
  svgCourseCredits
    .append("text")
    .text(formattedCredits(courseCredits))
      .attr("font-family", "sans-serif")
      .attr("font-size", "8px")
      .attr("color", "#777777")
      .attr("text-anchor", "end")
      .attr("alignment-baseline", "central")
      .attr("transform", "translate("+ 0.9*courseCreditsWidth +","+ 0.5 * courseCreditsHeight + ")")

  function createHistogramDict(min, max){
    /**
     * Create dict from min to max (included)
     * count for every score to zero
     */
    var startValues = [];
    for(var i = min;i <= max; i++)
    {
      startValues.push({grade:i, count:0});
    }
    return startValues;
  };

  function createLegend(svg, legendWidth, histogramHeight){
    var colorPass = "#3BFD40";
    var colorTolerable= "#E1B32D";
    var colorFailed = "#FD686A";
    var margin = 10;
    var height = 1;
    var barWidth = (0.9*legendWidth) / 21;
    var space = 0.05 * legendWidth;
    svg
            .append("rect")
            .attr("stroke",colorFailed)
            .attr("width", 8 * barWidth)
            .attr("height",height)
            .attr("transform", "translate(" + space + ", " + (histogramHeight + 2) +")")
            ;
    svg

            .append("rect")
            .attr("stroke",colorTolerable)
            .attr("width", 2 * barWidth)
            .attr("height", height)
            .attr("transform","translate("+ (space + (8*barWidth)) + "," + (histogramHeight + 2) +")")
    ;
    svg
            .append("rect")
            .attr("stroke",colorPass)
            .attr("width", 11* barWidth)
            .attr("height",height)
            .attr("transform","translate("+ (space + (10 * barWidth)) +  "," + (histogramHeight + 2) +")")
    ;
  }

  function createHistogram(svg, totalWidth, totalHeight){
    /*
    Create a histogram
    @param svg: svg you want to fill width the histogram + legend
    @param totalwidth: totalWidth of the svg = width of histogram
    @param totalHeight: totalHeigth of the svg = height of histogram

    */
    
    var bar = "#CBCBCB";
    var barSelect = "#020202";
    var colorScale = chroma.scale(["#0099FF","#F566FF"]);
    var margin  = 0.05 * totalWidth;
    var widthEachScore = 0.9 * totalWidth / 21;
    var barFraction = 0.95
    var barWidth = barFraction  * widthEachScore;
    var spaceWidth = (1- barFraction) * widthEachScore;
    var legendFraction = 0.2
    var histogramHeight = (1- legendFraction ) * totalHeight;

    
    //create basic graph without data
    // real data inputted in course.js
    
    // Temporary max score and minimum score
    var tempMax = 20; var tempMin = 0;
    // Create dict to count nb occurences each score
    var startValues = createHistogramDict(tempMin, tempMax);
    // ???? init max variable ?????
    startValues.max = 20;

    var g = svg.append("g");
    
    createLegend(svg, totalWidth, histogramHeight);
    
    // Create bars for every score
    var graph = g.selectAll("rect")
                      .data(startValues);
    
    graph.enter().append("rect")
                      .attr("height",function(d){
                        // overwritten in course.js
                          // max = 100% * histHeight => unitHeight 
                          var heightUnit = 0.01 * startValues.max * histogramHeight;
                          return d.count * heightUnit;
                      })
                      .attr("width",function(d){
                        // not overwritten
                          return barWidth;
                      })
                      .attr("fill", function(d){
                        // overwritten in course.js
                        // fill the bars
                              return bar;
                      })
                      .attr("transform",function(d,i){
                        // overwritten in course.js
                          return "translate(" + ((margin + d.grade * widthEachScore)).toString() + ","+ (1.0 - d.count/(startValues.max- 0)) * totalHeight+ ")";

                      });
  }

  createHistogram(svgHistogram, svgHistogramWidth, svgHistogramHeight);

  function zoom(instance, scale, click){
    if (clicked || scale === 1){
      instance
        .style("transform" , "scale(1,1)")
        .style("background", "none")
        .style("z-index", "auto")
        .style("box-shadow", "none")
        ;
      if (click){
        clicked = false;
      }
    }
    else{
      instance
        .style("transform" , "scale(" + scale + "," + scale )
        .style("background", "white")
        .style("z-index", Number.MAX_SAFE_INTEGER)
        .style("box-shadow", "5px 5px 5px #888888")
        ;
      if (click){
        clicked = true;
      }    
    }
  }

  container.on("click", function(){
    zoom(d3.select(this), 1.5, true); 
  })

  container.on("dblclick", function(){
    zoom(d3.select(this), 2, true)  
  })

  container.on("mouseover", function(){
    if (clicked === false){
      zoom(d3.select(this), 1.5, false);
    }
    
  })
  container.on("mouseout", function(){
    if (clicked === false){
      zoom(d3.select(this), 1, false);
    }
  }) 

  instance.autorun(function(){
    var totalwidth = svgHistogramWidth;
    var totalHeight = svgHistogramHeight;
    //Session.get("student")
    var handler = instance.subscribe("generic_courses",function(){});
    var handler2 = instance.subscribe("generic_grades",Session.get("student"));
    var handler3 = instance.subscribe("ijkingstoets", Session.get("student"));

    if(handler.ready() && handler2.ready() && handler3.ready())
    {

      var studentGrade = instance.data.grade;

      var method = instance.data.method;
      var semester = instance.data.semester;
      var svg = d3.select(instance.find("svg"));

      var graph = svg.select("g").selectAll("rect");
      var courseId = instance.data.id;

      var totalwidth = svgHistogramWidth;
      var totalHeight = svgHistogramHeight;

      if(method == undefined) method = "getCoursePointDistribution";
      if(semester == undefined) semester = 2;
      //ugly hack: if 3, is 2e zit. we want to show histogram depending on the period
      //you received the highest grade. 3 means you'll show grade_try2, so
      //if they got a higher score in try1, we force it to semester=2 (or 1, doesn't matter)

      if(semester == 3 && instance.data.try1 != undefined)
      {
        if(instance.data.try1 >= instance.data.try2 || instance.data.try2 == "NA")
          semester = 2;
      }

      Meteor.call(method, [courseId, Session.get("Year"), semester], function(err,data){
        //if(courseId == "H01A4A") console.log(courseId, studentGrade, Session.get("student"));
        //console.log("getCoursePointDistribution");
        var totalwidth = svgHistogramWidth;
        var totalHeight = svgHistogramHeight;        
        var bar = "#CBCBCB";
        var barSelect = "#020202";
        var colorScale = chroma.scale(["#0099FF","#F566FF"]);
        var margin = 0.01 * totalCourseWidth;
        var widthEachScore = totalWidth / 21;
        var barFraction = 0.95
        var barWidth = barFraction  * widthEachScore;
        var spaceWidth = (1- barFraction) * widthEachScore;
        var legendFraction = 0.2
        var histogramHeight = (1- legendFraction ) * totalHeight;
        var heightUnit = 0.01 * data.max * histogramHeight;


        graph.data(data.numberPerGrades)
        graph.transition()
                          .attr("height",function(d){
                              return d.count * heightUnit;
                          })
                          .attr("fill", function(d){
                              if(d.grade == studentGrade)
                                  return barSelect;
                              else
                                  return bar;
                          })
                          .attr("transform",function(d,i){
                              // var spacing = 10.0;


                              // return "translate(" + ((d.grade / 20.0) * spacing +   (d.grade / 20.0) * totalHeight).toString() + ","+ (1.0 - d.count/(data.max- 0)) * height+ ")";
                              return "translate(" + (d.grade * widthEachScore).toString() + ","+ (1.0 - d.count/(st.max- 0)) * totalHeight+ ")";
                              

                          });


      });
    }
  })

});
