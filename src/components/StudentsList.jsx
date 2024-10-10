import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  DataGrid,
  GridToolbar,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { Container, Box } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { getAllUsers, updateUser } from '../api/user.api';

export default function StudentList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState({});
  const { getAccessTokenSilently } = useAuth0();

  const handleProcessRowUpdate = async (newRow, oldRow) => {
    // Call your API here with the updated user object
    try {
      let updatedUser = {
        ...oldRow.user,
        name: newRow.name,
        email: newRow.email,
        role: newRow.role,
      };
      const token = await getAccessTokenSilently();
      // API request to update the user
      const { ok, error, user } = await updateUser(token, updatedUser);
      if (!ok) {
        enqueueSnackbar(`Failed to update the user: ${error}`, {
          autoHideDuration: 5000,
          variant: 'error',
        });
        return oldRow; // revert to the old row if there's an error
      }
      updatedUser = { ...updatedUser, ...user, id: oldRow.id };
      // If API call is successful, update the state
      setUsers((prevData) =>
        prevData.map((row) => (row.id === newRow.id ? updatedUser : row)),
      );
      enqueueSnackbar('User updated successfully', {
        autoHideDuration: 5000,

        variant: 'success',
      });
      return newRow; // return the updated row to the grid
    } catch (err) {
      enqueueSnackbar(`Failed to update the user: ${err}`, {
        autoHideDuration: 5000,

        variant: 'error',
      });
      return oldRow; // revert to the old row if there's an error
    }
  };

  useEffect(() => {
    const getStudents = async () => {
      const token = await getAccessTokenSilently();
      const res = await getAllUsers(token);
      if (!res.ok) {
        // eslint-disable-next-line no-console
        console.error('Error fetching users:', res.error);
        enqueueSnackbar(res.error, {
          variant: 'error',
          autoHideDuration: 5000,
        });
        setLoading(false);
        return;
      }
      const rows = res.users.map((user, index) => ({
        id: user._id,
        count: index + 1,
        name: user.name,
        email: user.email,
        role: user.role,
        user,
        // createdAt: user.createdAt,
      }));
      setUsers(rows);
      setLoading(false);
    };
    getStudents();
  }, [setUsers, getAccessTokenSilently]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      // eslint-disable-next-line no-param-reassign
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = users.find((row) => row.id === id);
    if (editedRow.isNew) {
      setUsers(users.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  // DataGrid columns to show
  const columns = [
    { field: 'count', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
      // editing roles
      editable: true,
      type: 'singleSelect',
      valueOptions: ['student', 'educator', 'admin'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    // { field: 'createdAt', headerName: 'Created At', width: 200 },
  ];
  return (
    <Container>
      <h1>List Of People</h1>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(95vh - 32px)', // Full height minus padding
          padding: '16px', // Padding around the grid
        }}
      >
        {loading && <p>Loading...</p>}
        {!loading && (
          <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={5}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              initialState={{
                filter: {
                  filterModel: {
                    items: [],
                  },
                },
              }}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={handleProcessRowUpdate}
            />
          </div>
        )}
      </Box>
    </Container>
  );
}