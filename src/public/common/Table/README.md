# Open Targets Table Component

API documentation for the Table Component.

## Import

(This will be effective when the component moves to `ot-ui`)

```javascript
import Table from 'ot-ui/Table';
// or
import { Table } from 'ot-ui';
```

## Props

| Name                     | Type               | Default               | Description                                                                                                                                                        |
| ------------------------ | ------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `columns`\*              | `array`            |                       | Array of [Column data object](#columndata).                                                                                                                        |
| `rows`\*                 | `array`            |                       | Row data.                                                                                                                                                          |
| `rowCount`               | `number`           |                       | _serverSide_ Number of rows in data.                                                                                                                               |
| `fixedRows`              | `array`            | `[]`                  | Row data for fixed rows. Fixed rows will stay on top of the normal rows of the table.                                                                              |
| `headerGroups`\*         | `array`            | `[]`                  | If not empty, a first header row will be rendered with the given groups. See [headers object](#headersobject).                                                     |
| `onTableAction`          | `function`         |                       | Callback fired when an action is performed on the table.<br><br>**Signature**: `function(params: object) => void`<br>_params_: [action parameters](#paramsobject). |
| `pageSize`               | `number`           | `10`                  | Number of rows (fixed + regular) to display per page.                                                                                                              |
| `dataDownloader`         | `bool`             | `false`               | If `true`, the table will include the data download widget on top.                                                                                                 |
| `dataDownloaderFileStem` | `string`           | `'data'`              | File name without extension for the data download widget.                                                                                                          |
| `dataDownloaderRows`     | `function | array` | value of `rows` prop. | Rows array or a function returning the rows array passed to the data download widget to create file contents.<br><br>**Signature**: `function() => []`             |
| `hover`                  | `bool`             | `false`               | If `true`, the table rows will shade on hover.                                                                                                                     |
| `order`                  | `'asc' | 'desc'`   | `'asc'`               | Default ordering (ascending or descending).                                                                                                                        |
| `serverSide`             | `bool`             | `false`               | If `true`, the table will work in [server side mode](#tablemode).                                                                                                  |
| `showGlobalFilter`       | `bool`             | `false`               | If `true`, the table will show the global filter input box.                                                                                                        |
| `shortBy`                | `string`           |                       | Column id to set as the default for table row sorting.                                                                                                             |
| `noWrap`                 | `bool`             | `true`                | If `false`, table row content will wrap. This will disable the table fixed height feature.                                                                         |
| `noWrapHeader`           | `bool`             | `true`                | If `false`, table header content will wrap.                                                                                                                        |

## <a name="columndata"></a> Column data object

| Field          | Type       | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------- | ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | `string`   |         | Column id, must match a field name in the `row` prop.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `comparator`   | `function` |         | If present, the table will use this function to sort the data when clicking on the column header. Otherwise the [default sort comparation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) will be used. **Signature**:<br><br>`function(a, b) => number`<br>_a_, _b_: two elements to compare.<br>_returns_: `-1|0|1` similar to the [sort compare function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description). |
| `export`       | `function` |         | If present, the data downloader will use this function to generate this column in the exported file.<br><br>**Signature**: `function(row: object) => string`<br>_row_: a row coming from the `row` table prop array.                                                                                                                                                                                                                                                                                                 |
| `filterValue`  | `function` |         | If present, the global filter will use the return value of this function to discriminate elements.<br><br>**Signature**: `function(row: object) => string`<br>_row_: a row coming from the `row` table prop array.                                                                                                                                                                                                                                                                                                   |
| `label`        | `string`   |         | Column label, will be shown on the table header.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `labelStyle`   | `object`   |         | CSS Style to apply to the column label.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `numeric`      | `bool`     | `false` | If `true`, the column cells will align right and be displayed in monospaced typography.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `renderCell`   | `function` |         | If present, the table will render the return value of the function in the cells of the column.<br><br>**Signature**: `function(row: object) => node`<br>_row_: a row coming from the `row` table prop array.                                                                                                                                                                                                                                                                                                         |
| `sortable`     | `bool`     | `false` | If `true`, the table will allow selecting this column to sort the content rows.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tooltip`      | `node`     |         | Node to render inside the header's tooltip. If present, a `?` icon will be shown beside the column label in the header, with the contents of this field as a tooltip.                                                                                                                                                                                                                                                                                                                                                |
| `tooltipStyle` | `object`   |         | CSS Rules to apply to the tooltip. Refer to [material-ui tooltip css docs](https://material-ui.com/api/tooltip/#css).                                                                                                                                                                                                                                                                                                                                                                                                |
| `hidden`       | `array`    | []      | Breakpoints in which the column will not be shown. Refer to [material-ui hidden component API](https://material-ui.com/api/hidden/).                                                                                                                                                                                                                                                                                                                                                                                 |

## <a name="paramsobject"></a> Action parameters object

| Field          | Type             | Description                                          |
| -------------- | ---------------- | ---------------------------------------------------- |
| `globalFilter` | `string`         | User input in the global filter field.               |
| `order`        | `'asc' | 'desc'` | Ordering selected by the user.                       |
| `sortBy`       | `string`         | Column id selected by the user to sort the table by. |
| `page`         | `number`         | Page index selected by the user.                     |

## <a name="tablemode"></a> Table modes

The table can work in either server side mode or client side mode.

In client side mode, all pagination, filtering and sorting is made automatically by the table, assuming all data is present in the `rows` prop.

In server side mode, the table will trigger `onTableAction` callbacks whenever the user interacts with pagination, filtering or sorting, to defer the handling to the outside.

It is worth nothing the `dataDownloader` prop will not work properly in server side mode unless a rows function that fetches the whole dataset is supplied.
