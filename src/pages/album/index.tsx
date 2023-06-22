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
import TrackModal from './components/TrackModel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function AlbumPage() {
  const [tracks, setTracks] = useState([]);
  const [userId, setUserId] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const album_id = window.location.pathname.split('/')[2];

  const api_url = import.meta.env.VITE_API_URL as string;

  function retrieveTracks() {
    fetch(`${api_url}/albums/${album_id}/tracks?limit=10&offset=0`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTracks(data.tracks);
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

  const deleteTrack = async (id: string) => {
    await fetch(`${api_url}/artists/${userId}/tracks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify({
        tracks: [id],
      }),
    })
      .then((response) => response.json())
      .then((_) => {
        retrieveTracks();
      });
  };

  useEffect(() => {
    retrieveTracks();
    getUserId();
  }, []);

  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);

  const handleUpdateModalOpen = (row: any) => {
    setUpdateModalOpen(true);
  };
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'album',
      headerName: 'Album',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        return params.row.album.name;
      },
    },
    { field: 'track_number', headerName: 'Track Number', flex: 1 },
    {
      field: 'artists',
      headerName: 'Artists',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        return params.row.artists.map((artist: any) => {
          return artist.full_name;
          return ',';
        });
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <NavLink to={`/track/${params.row.id}`}>
            <ListAltIcon />
          </NavLink>
          <IconButton onClick={() => handleUpdateModalOpen(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteTrack(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows: GridRowsProp = tracks;

  const createTrackFormik = useFormik({
    initialValues: {
      name: '',
      file: '',
      track_number: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).required('Name is required'),
      file: Yup.string().required('File is required'),
      track_number: Yup.string().max(255).required('Track number is required'),
    }),
    onSubmit: async (values: any) => {
      try {
        const response = await axios.post(
          `${api_url}/albums/${album_id}/tracks`,
          {
            tracks: [
              {
                name: values.name,
                file: values.file,
                track_number: values.track_number,
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('accessToken')}`,
            },
          }
        );
        retrieveTracks();
        setCreateModalOpen(false);
      } catch (error) {}
    },
  });

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
                <Typography variant="h4">Tracks</Typography>
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

      <TrackModal
        handleModalClose={handleCreateModalClose}
        modalOpen={createModalOpen}
        submitLabel="Create"
        formik={createTrackFormik}
        title="Create Track"
      />

      <TrackModal
        handleModalClose={handleUpdateModalClose}
        modalOpen={updateModalOpen}
        formik={createTrackFormik}
        submitLabel="Update"
        title="Update Track"
      />
    </>
  );
}
