# Changelog

- **v0.4.0**
  - Added filterable columns.
  - Added "Download As..." Modal.
    - CSV
    - JSON
    - TSV

- **v0.3.2**
  - Fixed issue causing `${time}`, `${time-from}`, and `${time-to}` to evaluate incorrectly when setting specific times.
  - Fixed error that occurred when trying to filter cell contents by negating a regexp or a string.

- **v0.3.1**
  - Fixed UTF-8 downloads which caused some characters from rendering incorrectly in Excel.

- **v0.3.0**
  - Added timezone offset capabilities.
  - Make sure that the move up and move down buttons for column definitions only show when applicable.

- **v0.2.0**
  - Added custom date formatting
  - Added ${join-col:...} syntax to reference join data on a cell-by-cell basis
  - Allow reordering of column definitions.
  - Allow toggling of pagination.

- **v0.1.1**
  - Fixed `${var:nameOfVar:param}` so that it will evaluate to `var-nameOfVar=...`.

- **v0.1.0**
  - Added standard number and date formatting.
  - Added the option to toggle auto refresh.
  - Added `${time}`, `${time-from}`, and `${time-to}` as meta groups for URLs.

- **v0.0.1**
  - First version
