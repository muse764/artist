import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function TrackModal({
  title,
  modalOpen,
  handleModalClose,
  formik,
  submitLabel,
}: {
  title: string;
  modalOpen: any;
  handleModalClose: any;
  formik: any;
  submitLabel: string;
}) {
  const [albums, setAlbums] = useState([]);

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

  useEffect(() => {
    retrieveAlbums();
  }, []);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const handleFile = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue('file', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>

        <FormControl fullWidth>
          <TextField
            error={!!(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            autoComplete="name"
          />
        </FormControl>

        <FormControl fullWidth>
          <Input
            onChange={handleFile}
            type="file"
            id="file"
            name="file"
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            error={
              !!(formik.touched.track_number && formik.errors.track_number)
            }
            helperText={
              formik.touched.track_number && formik.errors.track_number
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.track_number}
            margin="normal"
            required
            fullWidth
            name="track_number"
            label="Track Number"
            type="track_number"
            id="track_number"
            autoComplete="track_number"
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Album</InputLabel>
          <Select
            error={!!(formik.touched.albumId && formik.errors.albumId)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.albumId}
            labelId="demo-simple-select-label"
            id="albumId"
            name="albumId"
            label="Album"
            sx={{ m: 1 }}
          >
            {albums.map((album: any) => (
              <MenuItem key={album.id} value={album.id}>
                {album.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="reset">Cancel</Button>
        <Button type="submit">{submitLabel}</Button>
      </Box>
    </Modal>
  );
}
