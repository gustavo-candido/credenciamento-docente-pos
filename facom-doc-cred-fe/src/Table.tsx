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
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

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

function getInput({
  row,
  name,
  onChange,
  inputType,
  prodTecKind,
}: Record<string, any>) {
  const classes = useStyles();

  switch (inputType) {
    case "bool":
      return (
        <NativeSelect
          defaultValue={row[name]}
          inputProps={{
            name,
            id: row.id,
          }}
          onChange={(e) => onChange(e, row)}
        >
          <option value={"Sim"}>Sim</option>
          <option value={"Não"}>Não</option>
        </NativeSelect>
      );

    case "prodTecKind":
      return (
        <NativeSelect
          defaultValue={row[name]}
          inputProps={{
            name,
            id: row.id,
          }}
          onChange={(e) => onChange(e, row)}
        >
          {prodTecKind.map((item: any) => (
            <option value={item.kind}>{item.kind}</option>
          ))}
        </NativeSelect>
      );
    case "role":
      return (
        <NativeSelect
          defaultValue={row[name]}
          inputProps={{
            name,
            id: row.id,
          }}
          onChange={(e) => onChange(e, row)}
        >
          <option value={"ORIENTADOR"}>Orientador</option>
          <option value={"COORIENTADOR"}>Coorientador</option>
        </NativeSelect>
      );

    case "qualis":
      return (
        <NativeSelect
          defaultValue={row[name]}
          inputProps={{
            name,
            id: row.id,
          }}
          onChange={(e) => onChange(e, row)}
        >
          <option value={"A1"}>A1</option>
          <option value={"A2"}>A2</option>
          <option value={"A3"}>A3</option>
          <option value={"A4"}>A4</option>
          <option value={"B1"}>B1</option>
          <option value={"B2"}>B2</option>
          <option value={"B3"}>B3</option>
          <option value={"B4"}>B4</option>
        </NativeSelect>
      );

    case "degree":
      return (
        <NativeSelect
          defaultValue={row[name]}
          inputProps={{
            name,
            id: row.id,
          }}
          onChange={(e) => onChange(e, row)}
        >
          <option value={"IC"}>Inic.Cient.</option>
          <option value={"MESTRADO"}>Mestrado</option>
          <option value={"DOUTORADO"}>Doutorado</option>
          <option value={"POS-DOUTORADO"}>Pos</option>
        </NativeSelect>
      );

    case "project":
      return (
        <NativeSelect
          defaultValue={row[name]}
          inputProps={{
            name,
            id: row.id,
          }}
          onChange={(e) => onChange(e, row)}
        >
          <option value={"PESQUISA"}>Pesquisa</option>
          <option value={"DESENVOLVIMENTO"}>Desenvolvimento</option>
        </NativeSelect>
      );
    default:
      return (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          sx={classes.input}
        />
      );
  }
}

const CustomTableCell = ({
  row,
  name,
  onChange,
  inputType,
  prodTecKind,
}: Record<string, any>) => {
  const classes = useStyles();
  const { isEditMode } = row;

  return (
    <TableCell align="left" sx={classes.tableCell}>
      {isEditMode
        ? getInput({
            row,
            name,
            onChange,
            inputType,
            prodTecKind,
          })
        : row[name]}
    </TableCell>
  );
};

type EditableTableProps = {
  labels: string[];
  data: Record<string, any>[];
  inputType: string[];
  updateRow?: (index: number, args: Record<string, any>) => Promise<void>;
  prodTecKind?: Record<string, any>[];
};

export default function EditableTable({
  labels,
  data,
  inputType,
  updateRow,
  prodTecKind,
}: EditableTableProps) {
  const [rows, setRows] = useState<RowData[]>([]);
  const classes = useStyles();

  const onToggleEditMode = (id: any) => {
    setRows(() => {
      return rows.map((row, index) => {
        if (row.id === id) {
          updateRow && updateRow(index, row);
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
                {getCustomCellKeys(row).map((key, index) => (
                  <CustomTableCell
                    {...{ row, name: key, onChange }}
                    key={key}
                    inputType={inputType[index]}
                    prodTecKind={prodTecKind}
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
