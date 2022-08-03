import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/DoneAllTwoTone";

import Input from "@mui/material/Input";
import { useEffect, useState } from "react";

type RowData = {
  id: string;
  isEditMode: boolean;
} & Record<string, unknown>;

const useStyles = () => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
});

const randomId = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

const createData = (data: Record<string, unknown>): RowData => ({
  id: randomId(),
  isEditMode: false,
  ...data,
});

const getCustomCellKeys = (row: Record<string, unknown>) => {
  let cpy = { ...row };

  delete cpy.id;
  delete cpy.isEditMode;

  return Object.keys(cpy);
};

const CustomTableCell = ({ row, name, onChange }: Record<string, any>) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" sx={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          sx={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

type EditableTableProps = {
  labels: string[];
  data: Record<string, any>[];
};

export default function EditableTable({ labels, data }: EditableTableProps) {
  const [rows, setRows] = useState<RowData[]>([]);
  const classes = useStyles();

  const onToggleEditMode = (id: any) => {
    setRows(() => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e: any, row: any) => {
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  useEffect(() => {
    setRows(() => {
      return data.map((item) => createData(item));
    });
  }, [data]);

  return (
    <Paper sx={classes.root}>
      <Table sx={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            {labels.map((label) => (
              <TableCell align="left" key={label}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell sx={classes.selectTableCell}>
                  {row.isEditMode ? (
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                {getCustomCellKeys(row).map((key) => (
                  <CustomTableCell
                    {...{ row, name: key, onChange }}
                    key={key}
                  />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
