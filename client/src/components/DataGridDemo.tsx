import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../api";
import SpinnerOfDoom from "./Spinners/SpinnerOfDoom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import BasicModal from "./BasicModal";

export type RowType = {
  product_id: number;
  manufacturer: string;
  category: string;
  created_at: string;
  updated_at: string;
  description: string;
  price: string;
  product_name: string;
  stock_quantity: string;
  is_featured: number;
};

export default function DataGridDemo() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [productId, setProductId] = useState<number | null>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 110,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 110,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 110,
      editable: true,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      width: 110,
      editable: true,
    },
    {
      field: "created_at",
      headerName: "Added",
      width: 110,
      editable: true,
    },
    {
      field: "is_featured",
      headerName: "Is Featured?",
      width: 110,
      editable: true,
      valueFormatter({ value }) {
        const label = value === 1 ? "Yes" : "No";
        return label;
      },
    },
    {
      field: "stock_quantity",
      headerName: "Quantity",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          onClick={() => {
            console.log(params.row.id);
          }}
          label="Delete"
        />,
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          onClick={() => {
            setProductId(params.row.id as number);
            handleOpen();
            console.log(params.row.id);
          }}
          label="Edit"
        />,
      ],
    },
  ];

  const navigate = useNavigate();
  const { updateUserInfo } = useContext(UserContext);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });

  const {
    data: rows,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(paginationModel.page),
  });

  if (isError) {
    console.log(error);
    updateUserInfo(null);
    navigate("/login");
  }

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <>
      <DataGrid
        rowCount={10000}
        pagination
        rows={rows as any[]}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
      <BasicModal open={open} handleClose={handleClose} productId={productId} />
    </>
  );
}
