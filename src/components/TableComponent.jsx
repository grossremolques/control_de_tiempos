import DataTable, {createTheme} from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      minHeight: "42px",
      fontSize: "0.9rem",
      backgroundColor: "transparent",
    },
  },
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      backgroundColor: "oklch(0.929 0.013 255.508)",
    },
  }, 
};
const options = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
};
createTheme(
	'default',
	{
		
		background: {
			default: 'transparent',
		},
	},
	'light',
);
export default function TableComponent({
  columns,
  data,
  handleOnRowClick,
  noDataComponent = <p>No hay datos para mostrar</p>,
}) {
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      pagination
      paginationPerPage={10}
      paginationComponentOptions={options}
      pointerOnHover
      highlightOnHover
      onRowClicked={handleOnRowClick}
      noDataComponent={noDataComponent}
      theme="default"
    />
  );
}
