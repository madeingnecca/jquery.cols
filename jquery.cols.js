(function($) {

'use strict';

function reorder(table, colCount) {
  var $table;
  var $cells;
  var $cell;
  var $trs;
  var $newRow;
  var cellsCount;
  var row, col;
  var next, prev;

  $table = $(table);
  $trs = $table.find('tr');
  $cells = $table.find('td');
  cellsCount = $cells.length;

  prev = {colCount: (cellsCount / $trs.length), rowCount: $trs.length};
  next = {colCount: colCount, rowCount: (cellsCount / colCount)};

  if (next.rowCount > prev.rowCount) {
    for (row = 0; row < next.rowCount; row++) {
      $newRow = $('<tr></tr>');
      $trs.last().after($newRow);
      $trs = $trs.add($newRow);
    }
  }

  for (row = 0; row < next.rowCount; row++) {
    for (col = 0; col < next.colCount; col++) {
      $cell = $cells.eq(row * next.colCount + col);
      $cell.appendTo($trs.get(row));
    }
  }

  $trs.filter(':empty').remove();
}

$.fn.cols = function(colCount) {
  return $(this).each(function() {
    reorder(this, colCount);
  });
};

}(jQuery));
