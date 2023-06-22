import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';

export default function AlbumModal({
  title,
  modalOpen,
  handleModalClose,
  handleChange,
  handleSubmit,
  submitLabel,
  popupInfo,
}: {
  title: string;
  modalOpen: any;
  handleModalClose: any;
  handleChange: any;
  handleSubmit: any;
  submitLabel: string;
  popupInfo: any;
}) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>

        <FormControl fullWidth>
          <TextField
            type="text"
            onChange={handleChange}
            label="Name"
            value={popupInfo.name}
            id="name"
            name="name"
            autoComplete="name"
            sx={{ m: 1 }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            type="text"
            onChange={handleChange}
            label="Release Date"
            value={popupInfo.release_date}
            id="release_date"
            name="release_date"
            autoComplete="release_date"
            sx={{ m: 1 }}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="type"
            name="type"
            value={popupInfo.type}
            label="Type"
            sx={{ m: 1 }}
            onChange={handleChange}
          >
            <MenuItem value={'single'}>Single</MenuItem>
            <MenuItem value={'album'}>Album</MenuItem>
            <MenuItem value={'compilation'}>Compilation</MenuItem>
          </Select>
        </FormControl>
        <Button type="reset">Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </Box>
    </Modal>
  );
}
