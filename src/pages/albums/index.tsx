import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import {
  IconButton,
  Box,
  Container,
  Stack,
  Typography,
  Button,
  SvgIcon,
  Card,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AlbumModal from './components/AlbumModel';
import { NavLink } from 'react-router-dom';

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [userId, setUserId] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState({
    id: '',
    name: '',
    release_date: '',
    type: '',
  });

  const api_url = import.meta.env.VITE_API_URL as string;

  function retrieveAlbums() {
    fetch(`${api_url}/me/albums`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.albums);
      });
  }

  function requestNewToken() {
    fetch(`${api_url}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: Cookies.get('refreshToken'),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        Cookies.set('accessToken', data.accessToken);
      });
  }

  const getUserId = async () => {
    await fetch(`${api_url}/me`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.user.id);
      });
  };

  const deleteAlbum = async (id: string) => {
    await fetch(`${api_url}/artists/${userId}/albums`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify({
        albums: [id],
      }),
    })
      .then((response) => response.json())
      .then((_) => {
        retrieveAlbums();
      });
  };

  const handleChange = (event: any) => {
    setPopupInfo({
      ...popupInfo,
      [event.target.name]: event.target.value,
    });
  };

  function createAlbum() {
    fetch(`${api_url}/artists/${userId}/albums`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify({
        albums: [popupInfo],
      }),
    })
      .then((response) => response.json())
      .then((_) => {
        retrieveAlbums();
        handleCreateModalClose();
      });
  }

  function updateAlbum() {
    fetch(`${api_url}/albums/${popupInfo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify({
        name: popupInfo.name,
        release_date: popupInfo.release_date,
        type: popupInfo.type,
      }),
    })
      .then((response) => response.json())
      .then((_) => {
        retrieveAlbums();
        handleUpdateModalClose();
      });
  }

  const handleCreateSubmit = (event: any) => {
    event.preventDefault();
    createAlbum();
  };

  const handleUpdateSubmit = (event: any) => {
    event.preventDefault();
    updateAlbum();
  };

  useEffect(() => {
    Cookies.get('accessToken')
      ? console.log('Logged in')
      : (window.location.href = '/auth/login');

    requestNewToken();
    retrieveAlbums();
    getUserId();
  }, []);

  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);

  const handleUpdateModalOpen = (row: any) => {
    setPopupInfo(row);
    setUpdateModalOpen(true);
  };
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'release_date', headerName: 'Release Date', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <IconButton>
            <NavLink to={`/album/${params.row.id}`}>
              <ListAltIcon />
            </NavLink>
          </IconButton>
          <IconButton onClick={() => handleUpdateModalOpen(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteAlbum(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows: GridRowsProp = albums;

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Albums</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  onClick={handleCreateModalOpen}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <Card>
              <DataGrid rows={rows} columns={columns} />
            </Card>
          </Stack>
        </Container>
      </Box>

      <AlbumModal
        handleChange={handleChange}
        handleModalClose={handleCreateModalClose}
        handleSubmit={handleCreateSubmit}
        modalOpen={createModalOpen}
        popupInfo={popupInfo}
        submitLabel="Create"
        title="Create Album"
      />

      <AlbumModal
        handleChange={handleChange}
        handleModalClose={handleUpdateModalClose}
        handleSubmit={handleUpdateSubmit}
        modalOpen={updateModalOpen}
        popupInfo={popupInfo}
        submitLabel="Update"
        title="Update Album"
      />
    </>
  );
}
