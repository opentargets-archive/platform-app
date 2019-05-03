import apijs from 'tnt.api';

// TODO: update tntvis to use the latest version of d3 (not v3 as here)
// this file is a tweaked version of that in the `tnt.tooltip` dep
const d3 = window.d3;

var tooltip = function() {
  var drag = d3.behavior.drag();
  var tooltip_div;

  var conf = {
    container: undefined,
    position: 'right',
    allow_drag: true,
    show_closer: true,
    fill: function() {
      throw 'fill is not defined in the base object';
    },
    width: 180,
    id: 1,
  };

  var t = function(data, event) {
    drag
      .origin(function() {
        return {
          x: parseInt(d3.select(this).style('left')),
          y: parseInt(d3.select(this).style('top')),
        };
      })
      .on('drag', function() {
        if (conf.allow_drag) {
          d3.select(this)
            .style('left', d3.event.x + 'px')
            .style('top', d3.event.y + 'px');
        }
      });

    // TODO: Why do we need the div element?
    // It looks like if we anchor the tooltip in the "body"
    // The tooltip is not located in the right place (appears at the bottom)
    // See clients/tooltips_test.html for an example
    var containerElem = conf.container;
    if (!containerElem) {
      containerElem = selectAncestor(this, 'div');
      if (containerElem === undefined) {
        // We require a div element at some point to anchor the tooltip
        return;
      }
    }

    // console.log(containerElem);
    tooltip_div = d3
      .select(containerElem)
      .append('div')
      .attr('class', 'tnt_tooltip')
      .classed('tnt_tooltip_active', true) // TODO: Is this needed/used???
      .call(drag);

    // prev tooltips with the same header
    d3.select('#tnt_tooltip_' + conf.id).remove();

    // console.log(event);
    if (d3.event === null && event) {
      d3.event = event;
    }
    // var mouseAlt = function(node) {
    //   var event = sourceEvent();
    //   if ()
    // }
    var d3mouse = d3.mouse(containerElem);
    // var d3mouse = myMouse(containerElem);
    // d3Event = null;

    var xoffset = 0;
    if (conf.position === 'left') {
      xoffset = conf.width;
    }

    tooltip_div.attr('id', 'tnt_tooltip_' + conf.id);

    // We place the tooltip
    tooltip_div
      .style('left', d3mouse[0] - xoffset + 'px')
      .style('top', d3mouse[1] + 'px');

    // Close
    if (conf.show_closer) {
      tooltip_div
        .append('div')
        .attr('class', 'tnt_tooltip_closer')
        .on('click', function() {
          t.close();
        });
    }

    conf.fill.call(tooltip_div.node(), data);

    // return this here?
    return t;
  };

  // gets the first ancestor of elem having tagname "type"
  // example : var mydiv = selectAncestor(myelem, "div");
  function selectAncestor(elem, type) {
    type = type.toLowerCase();
    if (elem.parentNode === null) {
      console.log('No more parents');
      return undefined;
    }
    var tagName = elem.parentNode.tagName;

    if (tagName !== undefined && tagName.toLowerCase() === type) {
      return elem.parentNode;
    } else {
      return selectAncestor(elem.parentNode, type);
    }
  }

  var api = apijs(t).getset(conf);

  api.check(
    'position',
    function(val) {
      return val === 'left' || val === 'right';
    },
    "Only 'left' or 'right' values are allowed for position"
  );

  api.method('close', function() {
    if (tooltip_div) {
      tooltip_div.remove();
    }
  });

  return t;
};

tooltip.list = function() {
  // list tooltip is based on general tooltips
  var t = tooltip();
  var width = 180;

  t.fill(function(obj) {
    var tooltip_div = d3.select(this);
    var obj_info_list = tooltip_div
      .append('table')
      .attr('class', 'tnt_zmenu')
      .attr('border', 'solid')
      .style('width', t.width() + 'px');

    // Tooltip header
    if (obj.header) {
      obj_info_list
        .append('tr')
        .attr('class', 'tnt_zmenu_header')
        .append('th')
        .text(obj.header);
    }

    // Tooltip rows
    var table_rows = obj_info_list
      .selectAll('.tnt_zmenu_row')
      .data(obj.rows)
      .enter()
      .append('tr')
      .attr('class', 'tnt_zmenu_row');

    table_rows
      .append('td')
      .style('text-align', 'center')
      .html(function(d, i) {
        return obj.rows[i].value;
      })
      .each(function(d) {
        if (d.link === undefined) {
          return;
        }
        d3.select(this)
          .classed('link', 1)
          .on('click', function(d) {
            d.link(d.obj);
            t.close.call(this);
          });
      });
  });
  return t;
};

tooltip.table = function() {
  // table tooltips are based on general tooltips
  var t = tooltip();
  console.log(t.container());

  var width = 180;

  t.fill(function(obj) {
    var tooltip_div = d3.select(this);

    var obj_info_table = tooltip_div
      .append('table')
      .attr('class', 'tnt_zmenu')
      .attr('border', 'solid')
      .style('width', t.width() + 'px');

    // Tooltip header
    if (obj.header) {
      obj_info_table
        .append('tr')
        .attr('class', 'tnt_zmenu_header')
        .append('th')
        .attr('colspan', 2)
        .text(obj.header);
    }

    // Tooltip rows
    var table_rows = obj_info_table
      .selectAll('.tnt_zmenu_row')
      .data(obj.rows)
      .enter()
      .append('tr')
      .attr('class', 'tnt_zmenu_row');

    table_rows
      .append('th')
      .attr('colspan', function(d, i) {
        if (d.value === '') {
          return 2;
        }
        return 1;
      })
      .attr('class', function(d) {
        if (d.value === '') {
          return 'tnt_zmenu_inner_header';
        }
        return 'tnt_zmenu_cell';
      })
      .html(function(d, i) {
        return obj.rows[i].label;
      });

    table_rows
      .append('td')
      .html(function(d, i) {
        if (typeof obj.rows[i].value === 'function') {
          obj.rows[i].value.call(this, d);
        } else {
          return obj.rows[i].value;
        }
      })
      .each(function(d) {
        if (d.value === '') {
          d3.select(this).remove();
        }
      })
      .each(function(d) {
        if (d.link === undefined) {
          return;
        }
        d3.select(this)
          .classed('link', 1)
          .on('click', function(d) {
            d.link(d.obj);
            t.close.call(this);
          });
      });
  });

  return t;
};

tooltip.plain = function() {
  // plain tooltips are based on general tooltips
  var t = tooltip();

  t.fill(function(obj) {
    var tooltip_div = d3.select(this);

    var obj_info_table = tooltip_div
      .append('table')
      .attr('class', 'tnt_zmenu')
      .attr('border', 'solid')
      .style('width', t.width() + 'px');

    if (obj.header) {
      obj_info_table
        .append('tr')
        .attr('class', 'tnt_zmenu_header')
        .append('th')
        .text(obj.header);
    }

    if (obj.body) {
      obj_info_table
        .append('tr')
        .attr('class', 'tnt_zmenu_row')
        .append('td')
        .style('text-align', 'center')
        .html(obj.body);
    }
  });

  return t;
};

export default tooltip;
