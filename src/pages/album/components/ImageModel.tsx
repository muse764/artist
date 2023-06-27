import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Typography,
} from '@mui/material';

export default function TrackModal({
  title,
  modalOpen,
  handleModalClose,
  submitLabel,
  formik,
}: {
  title: string;
  modalOpen: any;
  handleModalClose: any;
  submitLabel: string;
  formik: any;
}) {
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
          <Input onChange={handleFile} type="file" id="file" name="file" />
        </FormControl>
        <Button type="reset">Cancel</Button>
        <Button type="submit">{submitLabel}</Button>
      </Box>
    </Modal>
  );
}
